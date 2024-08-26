const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  username: { type: String, required: true },
  progress: {
    type: Map,
    of: String, // Example: { "question1": "solved", "question2": "stuck" }
  },
});

module.exports = mongoose.model('Progress', ProgressSchema, "progress");
