const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');
const ReferralTree = require('../models/Tree');

router.post('/', async (req, res) => {
    const { email } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Step 1: Find the new user by email
        const newUser = await User.findOne({ email }).session(session);
        if (!newUser) {
            return res.status(404).send('User not found.');
        }

        // Step 2: Find the direct referrer
        let directReferrer = null;
        if (newUser.referPhoneNumber) {
            directReferrer = await User.findOne({ phone: newUser.referPhoneNumber }).session(session);
        }

        // Fallback to a default referrer if no direct referrer is found
        if (!directReferrer) {
            directReferrer = await User.findOne({ phone: "6359431369" }).session(session);
        }

        console.log("Direct Referrer:", directReferrer);

        // Step 3: Fetch the root node of the referral tree
        let rootNode = await ReferralTree.findOne({}).session(session);  // Modified to check the collection directly

        // Step 4: If root node doesn't exist, create one, else search and add the user under the referrer
        if (!rootNode) {
            // If root doesn't exist, create root node for referrer and add the new user as child
            rootNode = new ReferralTree({
                userId: directReferrer._id,
                children: [{
                    userId: newUser._id,
                    children: []
                }]
            });
            await rootNode.save({ session });
        } else {
            // If root exists, search for the referrer and add the new user
            const findNodeAndAddChild = (node, referrerId, newUserId) => {
                if (node.userId && node.userId.toString() === referrerId.toString()) {
                    node.children.push({ userId: newUserId, children: [] });
                    return true;
                }
                for (const child of node.children) {
                    if (findNodeAndAddChild(child, referrerId, newUserId)) {
                        return true;
                    }
                }
                return false;
            };

            // If referrer found, add the user under the referrer; else, add under root node
            let isAdded = false;
            if (directReferrer) {
                isAdded = findNodeAndAddChild(rootNode, directReferrer._id, newUser._id);
            }

            // If referrer not found, add under root node
            if (!isAdded) {
                rootNode.children.push({ userId: newUser._id, children: [] });
            }

            await rootNode.save({ session });
        }

        // Step 5: Update the referral chain for the new user bottom up
        let newReferralChain = [];
        if (directReferrer) {
            if (!directReferrer.referredBy || directReferrer.referredBy.length === 0) {
                newReferralChain = [directReferrer._id];
            } else if (directReferrer.referredBy.length < 21) {
                newReferralChain = [...directReferrer.referredBy, directReferrer._id];
            } else {
                newReferralChain = [...directReferrer.referredBy.slice(1), directReferrer._id];
            }
        }

        newUser.referredBy = newReferralChain;
        newUser.status = 'Approved';
        await newUser.save({ session });

        // Step 6: Direct sponsor receives 500
        if (directReferrer) {
            await User.findByIdAndUpdate(
                directReferrer._id,
                { $inc: { currentBalance: 500, totalIncome: 500, totalRefers: 1 } },
                { session }
            );
        }

        // Indirect referrals receive 20 each
        for (let i = 0; i < newReferralChain.length; i++) {
            const indirectReferrerId = newReferralChain[i];
            if (indirectReferrerId.toString() !== directReferrer._id.toString()) {
                await User.findByIdAndUpdate(
                    indirectReferrerId,
                    { $inc: { currentBalance: 20, totalIncome: 20, totalRefers: 1 } },
                    { session }
                );
            }
        }

        await session.commitTransaction();
        res.status(200).send(`Approval successful for ${email}`);
    } catch (error) {
        await session.abortTransaction();
        console.error('Error during user approval:', error);
        res.status(500).send('Error approving user. Changes rolled back.');
    } finally {
        session.endSession();
    }
});

module.exports = router;