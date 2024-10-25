const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Protected route example
router.get('/profile', authMiddleware, (req, res) => {
  // If the middleware passes, send the user data
  res.status(200).json({
    message: 'Welcome to your profile!',
    user: req.session.user, // Access user data from session
  });
});

module.exports = router;
