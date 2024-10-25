const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Replace with your actual User model path

// Route to get user data by email
router.get('/', async (req, res) => {
    console.log("Route reached"); // Log route access
    const email = req.query.email; // Extract the email from query parameters
    try {
      // Your logic to find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user); // Respond with user data
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
