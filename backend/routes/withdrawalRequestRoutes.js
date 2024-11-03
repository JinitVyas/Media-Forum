const express = require('express');
const { submitWithdrawalRequest } = require('../controllers/withdrawalRequestController');
const router = express.Router();

router.post('/', submitWithdrawalRequest);

module.exports = router;