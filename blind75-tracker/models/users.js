const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Add password field
    progress: [{
        question_id: String,
        status: String, // e.g., solved, stuck
        timestamp: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('User', UserSchema, 'users');
