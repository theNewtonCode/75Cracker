const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  id: Number,
  title: String,
});

module.exports = mongoose.model('Question', QuestionSchema, "questions");
