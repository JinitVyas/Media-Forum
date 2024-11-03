const jwt = require('jsonwebtoken'); // For token verification
const WithdrawalRequests = require('../models/WithdrawalRequest'); // Model for storing withdrawal records
const User = require('../models/User');

const handleWithdrawal = async (req, res) => {
    // Get the token from the authorization header
    const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token

    try {
        // Decode the token to get user ID and role
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
        const userId = decoded.id; // Extract user ID from decoded token
        const userRole = decoded.role; // Extract user role from decoded token

        // Check if the user is an admin
        if (userRole !== 'admin') {
            return res.status(403).json({ success: false, message: 'Permission denied: Admins only.' });
        }

        const { requestId } = req.body; // Get the request ID from the request body

        // Find the withdrawal request by ID
        console.log(requestId);
        const withdrawalRequest = await WithdrawalRequests.findById(requestId);

        // Ensure the request exists
        if (!withdrawalRequest) {
            return res.status(404).json({ success: false, message: 'Withdrawal request not found.' });
        }

        const user = await User.findById(withdrawalRequest.userId);

        const lastWithdrawal = await WithdrawalRequests.findOne({ userId: withdrawalRequest.userId }).sort({ createdAt: -1 });

        if (lastWithdrawal && (Date.now() - lastWithdrawal.createdAt) < 30 * 24 * 60 * 60 * 1000) {
            return res.json({ success: false, message: 'Withdrawal can only be made once every 30 days.' });
        }

        // Ensure current balance is greater than or equal to the withdrawal amount
        if (user.currentBalance < withdrawalRequest.amount) {
            return res.json({ success: false, message: 'Current balance must be greater than or equal to the withdrawal amount.' });
        }

        // Check the amount for business logic
        if (withdrawalRequest.amount < 500) {
            return res.json({ success: false, message: 'Minimum required amount is 500 INR.' });
        }

        // Proceed with withdrawal
        user.currentBalance -= withdrawalRequest.amount;
        await user.save();

        // Remove the withdrawal request from the database after approval
        await WithdrawalRequests.findByIdAndDelete(requestId);

        res.json({ success: true, message: 'Withdrawal approved successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `lund le le bhosdike Server error. ${error}` });
    }
};

module.exports = { handleWithdrawal };
