const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    totalEarnings: {
        type: Number,
        default: 0
    },
    totalOrders: {
        type: Number,
        default: 0
    },
    rewardPoints: {
        type: Number,
        default: 0
    },
    membershipLevel: {
        type: String,
        default: 'Silver'
    }
}, {
    timestamps: true // This adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('User', userSchema);
