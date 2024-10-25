// session.js (Backend route to fetch session data)
const express = require('express');
const User = require('../models/User'); // Import your User model
const router = express.Router();

router.get('/', async (req, res) => {
  // Check if a session exists
  if (!req.session.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    // Fetch user from the database using the session user ID
    const user = await User.findById(req.session.user.id);
    
    // If no user found, session is invalid
    if (!user) {
      return res.status(401).json({ message: 'Session is no longer valid' });
    }

    // Return session data to the frontend
    res.status(200).json(req.session.user);
  } catch (error) {
    console.error('Error fetching user from session:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
