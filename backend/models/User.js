const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  streetAddress: { type: String, required: true },
  town: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true }, 
  nomineeName: { type: String, required: true },
  sponsorId: { type: String, required: false, default: "9509416349"},
  vigilanceOfficer: { type: String, required: true },
  accountUsername: { type: String, required: true },
  password: { type: String, required: true },
  userImage: { type: String },            // New field for user image
  aadharFront: { type: String },          // New field for Aadhar front image
  aadharBack: { type: String },           // New field for Aadhar back image
  panCard: { type: String },              // New field for PAN card image
  bankPassbook: { type: String },         // New field for bank passbook image
  paymentScreenshot: { type: String },    // New field for payment screenshot
  registrationDate: { type: Date, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user',
    required: true 
  },
  status: { type: String, default: 'Pending' },
  lastWithdrawal: { type: String, required: false},
  currentBalance: { type: Number, default : 0},
  referredBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Create a User model
const User = mongoose.model('User', userSchema);

module.exports = User;
