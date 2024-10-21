const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login Route
router.post('/login', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // On success, fetch user data
    const userData = await User.findOne({ email });

    // Print email for testing
    console.log("User Email: ", userData.email);

    // Send data to frontend
    res.status(200).json({ message: 'Login successful', userData });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
