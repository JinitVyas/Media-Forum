const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    // console.log(req.headers.authorization.split(" ")[1]);

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: `Invalid token ${err}` });
    req.user = decoded; // Attach decoded token payload (including `id`) to `req.user`
    next();
  });
};

module.exports = verifyToken;