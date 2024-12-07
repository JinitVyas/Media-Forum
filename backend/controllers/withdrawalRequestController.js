const WithdrawalRequest = require('../models/WithdrawalRequest');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const submitWithdrawalRequest = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const { amount } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId);
        
        // Check if there's a pending request
        const existingRequest = await WithdrawalRequest.findOne({ userId, status: 'pending' });
        if (existingRequest) {
            return res.json({ success: false, message: 'You already have a pending withdrawal request.' });
        }

        // Find the most recent approved withdrawal request
        const lastWithdrawal = await WithdrawalRequest.findOne({ userId, status: 'approved' })
            .sort({ createdAt: -1 }); // Sort by createdAt in descending order to get the latest

        // Check if the last withdrawal was within the last 30 days
        if (lastWithdrawal && (Date.now() - lastWithdrawal.createdAt) < 30 * 24 * 60 * 60 * 1000) {
            return res.json({ success: false, message: 'Withdrawal can only be made once every 30 days.' });
        }

        // Check if balance is sufficient
        if (user.currentBalance < amount) {
            return res.json({ success: false, message: 'Insufficient balance for this withdrawal.' });
        }

        // Minimum withdrawal amount check
        if (amount < 500) {
            return res.json({ success: false, message: 'Minimum required amount is 500 INR.' });
        }

        // Create the new withdrawal request
        const newRequest = new WithdrawalRequest({ userId, amount });
        await newRequest.save();

        res.json({ success: true, message: 'Withdrawal request submitted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Server error. ${error}` });
    }
};

module.exports = { submitWithdrawalRequest };
