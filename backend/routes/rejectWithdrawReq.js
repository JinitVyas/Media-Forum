const express = require('express');
const router = express.Router();
const { rejectWithdrawRequest } = require('../controllers/rejectWithdrawRequest');
const verifyToken = require('../middleware/authMiddleware');

// Route for rejecting a withdrawal request
router.post('/', verifyToken, rejectWithdrawRequest);

module.exports = router;