// routes/protectedRoute.js
const express = require('express');
const router = express.Router();

// Example protected route
router.get('/', (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.session.user });
});

module.exports = router;
