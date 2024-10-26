const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Configure Multer for file uploads (make sure the directory exists)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../frontend/uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Naming convention for uploaded files
  },
});

const upload = multer({ storage });

// Route for user registration
router.post('/', upload.fields([
  { name: 'userImage', maxCount: 1 },
  { name: 'aadharFront', maxCount: 1 },
  { name: 'aadharBack', maxCount: 1 },
  { name: 'panCard', maxCount: 1 },
  { name: 'bankPassbook', maxCount: 1 },
  { name: 'paymentScreenshot', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      streetAddress,
      town,
      state,
      pincode,
      phone,
      email,
      nomineeName,
      referPhoneNumber, // Use referPhoneNumber for the referrer phone number
      vigilanceOfficer,
      accountUsername,
      password,
      registrationDate
    } = req.body;

    console.log("Received body data:", req.body);

    // Required field validation
    if (!firstName || !lastName || !email || !password || !registrationDate) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Check email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userImage = req.files['userImage'] ? req.files['userImage'][0].filename : null;
    const aadharFront = req.files['aadharFront'] ? req.files['aadharFront'][0].filename : null;
    const aadharBack = req.files['aadharBack'] ? req.files['aadharBack'][0].filename : null;
    const panCard = req.files['panCard'] ? req.files['panCard'][0].filename : null;
    const bankPassbook = req.files['bankPassbook'] ? req.files['bankPassbook'][0].filename : null;
    const paymentScreenshot = req.files['paymentScreenshot'] ? req.files['paymentScreenshot'][0].filename : null;

    // Save new user with the refer phone number
    const newUser = new User({
      firstName,
      lastName,
      streetAddress,
      town,
      state,
      pincode,
      phone,
      email,
      nomineeName,
      referPhoneNumber: referPhoneNumber || null, // Store referPhoneNumber here
      vigilanceOfficer,
      accountUsername,
      password: hashedPassword,
      userImage,
      aadharFront,
      aadharBack,
      panCard,
      bankPassbook,
      paymentScreenshot,
      registrationDate
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Error registering user:', err.message);
    res.status(500).json({ message: 'Server error while registering user' });
  }
});

module.exports = router;
