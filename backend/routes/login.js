const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User model is already set up
const router = express.Router();

// Login Route
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    console.log("lund");
    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Bada lund");

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // If the password is correct, create a JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Ensure JWT_SECRET is defined in .env
      { expiresIn: '1h' }, // Token will expire in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send token back to the frontend
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;