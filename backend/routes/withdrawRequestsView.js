// routes/withdrawRequestsView.js
const express = require('express');
const WithdrawalRecord = require('../models/WithdrawalRecord'); // Ensure you have this model set up for withdrawals
const User = require('../models/User');
const router = express.Router();

// GET route to fetch all withdrawal requests
router.get('/', async (req, res) => {
    try {
        // Fetch all withdrawal requests
        const withdrawalRequests = await WithdrawalRecord.find().populate('userId', 'username email name'); // Assuming userId references the User model

        // Format the response to include user details and withdrawal information
        const formattedRequests = withdrawalRequests.map(request => ({
            id: request._id,
            username: request.userId.username,
            name: request.userId.name,
            email: request.userId.email,
            withdrawAmount: request.amount,
            passbookPhoto: request.createdAt // Assuming there's a field for passbook photo URL
        }));

        res.json(formattedRequests);
    } catch (error) {
        console.error("Error fetching withdrawal requests:", error);
        res.status(500).json({ message: 'Server error while fetching withdrawal requests' });
    }
});

module.exports = router;
