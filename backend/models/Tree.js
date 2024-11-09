const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
    // root: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    children: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            children: []
        }
    ]
});

module.exports = mongoose.model('ReferralTree', treeSchema);
