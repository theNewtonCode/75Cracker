const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question_id: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    difficulty: String
});

module.exports = mongoose.model('Question', QuestionSchema,'questions');
