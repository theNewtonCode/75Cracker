const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({ token, userId: user._id, username: user.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token, userId: user._id, username: user.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Get user progress
router.get('/:id/progress', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user.progress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


const auth = require('../middleware/authMiddleware');

// Update user progress
router.put('/:id/progress', auth, async (req, res) => {
    const { question_id, status } = req.body;
    try {
        if (req.user.id !== req.params.id) {
            return res.status(401).json({ error: 'Authorization denied' });
        }

        const user = await User.findById(req.params.id);
        user.progress.push({ question_id, status });
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
