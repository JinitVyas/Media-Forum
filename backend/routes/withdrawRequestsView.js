// routes/withdrawRequestsView.js
const express = require('express');
const router = express.Router();
const WithdrawalRequest = require('../models/WithdrawalRequest');

// Route to fetch all withdrawal requests with user details
router.get('/', async (req, res) => {
    try {
        const requests = await WithdrawalRequest.aggregate([
            {
                $lookup: {
                    from: 'users', // The collection name for users
                    localField: 'userId', // Field in withdrawalrequests to match
                    foreignField: '_id', // Field in users collection to match
                    as: 'userDetails' // The name of the new field for joined data
                }
            },
            {
                $unwind: '$userDetails' // Flatten the userDetails array
            },
            {
                $project: {
                    _id: 1,
                    amount: 1,
                    status: 1,
                    createdAt: 1,
                    'userDetails.firstName': 1,
                    'userDetails.lastName': 1,
                    'userDetails.accountUsername': 1,
                    'userDetails.email': 1,
                    'userDetails.phone': 1,
                    'userDetails.bankPassbook': 1
                }
            }
        ]);

        res.json(requests);
    } catch (error) {
        console.error('Error fetching withdrawal requests with user details:', error);
        res.status(500).json({ message: 'Server error while fetching withdrawal requests.' });
    }
});

module.exports = router;
