const express = require('express');
const router = express.Router();
const { handleWithdrawal } = require('../controllers/withdrawalController');

router.post('/', handleWithdrawal);

module.exports = router;
