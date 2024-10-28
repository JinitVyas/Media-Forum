const WithdrawalRequest = require('../models/WithdrawalRequest'); // Assuming you've created this model

// Controller for rejecting a withdrawal request
exports.rejectWithdrawRequest = async (req, res) => {
  try {
    const { requestId, rejectionReason } = req.body;

    // Find the request by ID and check if it exists
    const withdrawalRequest = await WithdrawalRequest.findById(requestId);
    if (!withdrawalRequest) {
      return res.status(404).json({ success: false, message: 'Withdrawal request not found' });
    }

    // Update the request status to "rejected" and add the rejection reason
    withdrawalRequest.status = 'rejected';
    withdrawalRequest.rejectionReason = rejectionReason;
    await withdrawalRequest.save();

    res.status(200).json({ success: true, message: 'Withdrawal request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting withdrawal request:', error);
    res.status(500).json({ success: false, message: 'An error occurred while rejecting the request' });
  }
};