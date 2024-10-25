// login.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Login Route
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  console.log('Received email:', email);
  console.log('Received password:', password);

  try {
    // Check if the user exists (case insensitive email query)
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') }).select('+password');
    console.log('User found:', user); // Debugging user object

    if (!user || !user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Store all user data in session (except the password)
    req.session.user = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      streetAddress: user.streetAddress,
      town: user.town,
      state: user.state,
      pincode: user.pincode,
      phone: user.phone,
      nomineeName: user.nomineeName,
      sponsorId: user.sponsorId,
      vigilanceOfficer: user.vigilanceOfficer,
      accountUsername: user.accountUsername,
      userImage: user.userImage,
      aadharFront: user.aadharFront,
      aadharBack: user.aadharBack,
      panCard: user.panCard,
      bankPassbook: user.bankPassbook,
      paymentScreenshot: user.paymentScreenshot,
      registrationDate: user.registrationDate,
      role: user.role,
    };

    console.log('Session data:', req.session.user); // Check if session is working

    // Save session and set the session ID cookie
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating session' });
      }

      // Set the session cookie
      res.cookie('connect.sid', req.sessionID, {
        httpOnly: true,  // Makes the cookie inaccessible to JavaScript
        secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production
        maxAge: 24 * 60 * 60 * 1000,  // 1 day expiration
      });

      // Respond with success message
      res.status(200).json({ message: 'Login successful', sessionId: req.session.id });
    });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
