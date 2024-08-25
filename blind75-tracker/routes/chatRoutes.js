const express = require('express');
const Chat = require('../models/Chat');
const router = express.Router();

// Post a new chat message
router.post('/', async (req, res) => {
    const { username, message } = req.body;
    try {
        const chatMessage = new Chat({ username, message });
        await chatMessage.save();
        res.status(201).json(chatMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch all chat messages
router.get('/', async (req, res) => {
    try {
        const messages = await Chat.find({});
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
