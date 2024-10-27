// logout.js
const express = require('express');
const router = express.Router();

// Logout Route
router.post('/', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }

    // Clear the session cookie
    res.clearCookie('connect.sid');
    
    // Respond with success message
    res.status(200).json({ message: 'Logout successful' });
  });
});

module.exports = router;
