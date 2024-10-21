const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo'); 
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); 
const loginRoute = require('./routes/login'); // Import login route
require('dotenv').config(); 

const app = express();

// Connect to MongoDB with error handling
connectDB()
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });

// Check if important environment variables are loaded
if (!process.env.JWT_SECRET || !process.env.SESSION_SECRET || !process.env.MONGO_URI) {
  console.error('FATAL ERROR: Missing environment variables.');
  process.exit(1);
}

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, 
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
  })
}));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/login', loginRoute); // Use the login route
app.use('/api/users', require('./routes/userManagement.js'));
app.use('/api/register', require('./routes/registration'));

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    if (mongoose.connection.readyState === 1) {
      mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
      });
    }
  });
});

// Define port
const PORT = process.env.PORT || 3001;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle SIGINT for shutdown
process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server has shut down');
    process.exit(0);
  });
});
