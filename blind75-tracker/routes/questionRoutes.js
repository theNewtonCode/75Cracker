const express = require('express');
const Question = require('../models/Questions');
const router = express.Router();

// Fetch all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find({});
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
