const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email } = req.body;
    console.log(`Rejection request received for email: ${email}`);

    try {
        const result = await User.findOneAndDelete({ email: email });

        if (result) {
            res.status(200).send(`Rejection successful for ${email}`);
        } else {
            res.status(404).send(`User with email ${email} not found`);
        }
    } catch (error) {
        console.error('Error rejecting user:', error);
        res.status(500).send('Error rejecting user');
    }
}
);

module.exports = router;