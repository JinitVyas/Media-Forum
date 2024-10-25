
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email } = req.body;
    console.log(`Approval request received for email: ${email}`);
  
    try {
      // Find the user to approve
      const approvedUser = await User.findOneAndUpdate(
        { email: email },
        { status: 'Approved' },
        { new: true }
      );
  
      if (approvedUser) {
        const referredUserId = approvedUser._id; // Approved user's ID
        const referrerId = approvedUser.referredBy[0]; // Assuming the first ID is the direct referrer
  
        // Find the referrer user to get their referredBy list
        const referrerUser = await User.findById(referrerId);
        if (!referrerUser) {
          return res.status(404).send(`Referrer user not found`);
        }
  
        // Append the newly approved user's ID to the end of the referrer's referredBy list
        const updatedReferredByList = [...referrerUser.referredBy, referredUserId];
  
        // Update the referrer with the new referredBy list
        await User.findByIdAndUpdate(
          referrerId,
          { referredBy: updatedReferredByList }, // Update referredBy list
          { new: true }
        );
  
        // Update balances: Direct referrer gets 500, indirect referrers get 20
        await User.findByIdAndUpdate(
          referrerId,
          { $inc: { balance: 500 } }, // Increment by 500 for the direct referrer
          { new: true }
        );
  
        // Update balances for indirect referrers (up to 19 levels)
        for (let i = 1; i < Math.min(referrerUser.referredBy.length, 20); i++) {
          const indirectReferrerId = referrerUser.referredBy[i];
  
          // Update balance for indirect referrer
          await User.findByIdAndUpdate(
            indirectReferrerId,
            { $inc: { balance: 20 } }, // Increment by 20 for each indirect referrer
            { new: true }
          );
        }
  
        res.status(200).send(`Approval successful for ${email}`);
      } else {
        res.status(404).send(`User with email ${email} not found`);
      }
    } catch (error) {
      console.error('Error approving user:', error);
      res.status(500).send('Error approving user');
    }
  });
  
  module.exports = router;