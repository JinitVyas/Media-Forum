const express = require('express');
const { submitWithdrawalRequest } = require('../controllers/withdrawalRequestController');
const router = express.Router();

router.post('/withdrawRequest', submitWithdrawalRequest);

module.exports = router;