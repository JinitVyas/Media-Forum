const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User'); // Adjust path if needed

router.post('/', async (req, res) => {
    const { email, sponsorId } = req.body;
    console.log("LODO MARO",req.body)

    const newUser = await User.findOne({email:email})

    // Start a session for the transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Step 1: Check if sponsorId exists and find the sponsor user
        let sponsorUser;

        if (newUser.sponsorId) {
            sponsorUser = await User.findOne({ phone: newUser.sponsorId }).session(session);
        }

        // If no sponsorUser is found, assign the default sponsorId
        if (!sponsorUser) {
            // const sponsorIdDefault = phone; // Set to default
            sponsorUser = await User.findOne({ phone: newUser.sponsorId }).session(session);
        }

        // If no sponsorUser is still found, handle accordingly
        if (!sponsorUser) {
            // await session.abortTransaction();
            // session.endSession();
            console.log(`Sponsor with ID ${newUser.sponsorId} not found.`);
        }

        // Step 2: Create a new referral chain based on sponsor's referredBy list
        let newReferralChain;
        if (sponsorUser.referredBy.length === 0) {
            // Initialize with sponsor's ID if there are no entries
            newReferralChain = [sponsorUser.phone]; // Assuming phone numbers are stored as strings
        } else if (sponsorUser.referredBy.length < 21) {
            // Add sponsor's ID to the end if list has fewer than 21 entries
            newReferralChain = [...sponsorUser.referredBy, sponsorUser.phone];
        } else {
            // If list has 21 entries, remove the first and add sponsor's ID to the end
            newReferralChain = [...sponsorUser.referredBy.slice(1), sponsorUser.phone];
        }

        // Step 3: Create the new approved user with the referral chain
        const approvedUser = await User.findOneAndUpdate(
            { email: email },
            {
                ...req.body,
                referredBy: newReferralChain,
                status: 'Approved'
            },
            { new: true, session }
        );

        // Step 4: Update direct sponsor's balance by 500
        await User.findByIdAndUpdate(
            sponsorUser._id,
            { $inc: { currentBalance: 500 } },
            { new: true, session }
        );

        // Step 5: Update balances for each indirect referrer (20 per indirect referrer in the chain)
        for (let i = 0; i < newReferralChain.length - 1; i++) {
            const indirectReferrerPhone = newReferralChain[i]; // Assuming phone numbers are stored as strings
            await User.findOneAndUpdate(
                { phone: indirectReferrerPhone },
                { $inc: { currentBalance: 20 } },
                // { new: true, session }
            );
        }

        // Commit the transaction if all updates succeed
        await session.commitTransaction();
        session.endSession();

        res.status(200).send(`Approval successful for ${email}`);
    } catch (error) {
        // Rollback transaction on error
        await session.abortTransaction();
        session.endSession();
        console.error('Error during user approval:', error);
        res.status(500).send('Error approving user. Changes rolled back.');
    }
});

module.exports = router;
