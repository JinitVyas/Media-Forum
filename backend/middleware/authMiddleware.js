// middleware/authMiddleware.js
const session = require('express-session');

const authMiddleware = (req, res, next) => {
  // Check if the session exists and has a user object
  if (req.session && req.session.user) {
    // User is authenticated, proceed to the next middleware or route handler
    return next();
  }

  // User is not authenticated, return an unauthorized response
  return res.status(401).json({ message: 'Unauthorized: No session found' });
};

module.exports = authMiddleware;
