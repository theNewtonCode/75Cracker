const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Progress = require('../models/Progress');
const Question = require('../models/Question');

// Get all usernames
router.get('/users', async (req, res) => {
    try {
      // Fetch all users and select only the username field
      const users = await User.find().select('username');
      
      // Transform the user objects into an array of usernames
      const usernames = users.map(user => user.username);
      
      // Respond with the transformed data in the desired format
      res.json({ users: usernames });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

// Get all users' progress
// Get all users' progress
router.get('/', async (req, res) => {
    try {
      // Fetch all progress data
      const progressData = await Progress.find().select('username progress');
      
      // Transform the progress data into the desired format
      const formattedProgress = {};
      
      progressData.forEach(progress => {
        formattedProgress[progress.username] = progress.progress;
      });
  
      // Respond with the transformed data
      res.json({ users: formattedProgress });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }});

// Update a user's progress for a specific question
router.post('/update', async (req, res) => {
  const { username, questionId, status } = req.body;

  try {
    let userProgress = await Progress.findOne({ username });
    if (!userProgress) {
      userProgress = new Progress({ username, progress: {} });
    }

    userProgress.progress.set(questionId, status);
    await userProgress.save();

    res.json({ message: 'Progress updated successfully', progress: userProgress.progress });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get the list of questions
router.get('/questions', async (req, res) => {
    try {
      // Fetch all questions
      const questions = await Question.find().select('id title');
  
      // Transform the questions into the desired format
      const formattedQuestions = questions.map(question => ({
        [question.id]: question.title
      }));
  
      // Respond with the transformed data
      res.json({ questions: formattedQuestions });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

// Add a new user (protected by secret password)
router.post('/add-user', async (req, res) => {
  const { username, secretPassword } = req.body;

  if (secretPassword !== process.env.SECRET_PASSWORD) {
    return res.status(403).json({ message: 'Invalid secret password' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ username });
    await newUser.save();

    res.json({ message: 'User added successfully', username });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// Endpoint to add bulk questions
router.post('/addQuestions', async (req, res) => {
  try {
    const questions = req.body.questions.map((item, index) => ({
      id: index + 1,
      title: item[index + 1],
    }));

    await Question.insertMany(questions);
    res.status(200).json({ message: 'Questions added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add questions', details: error.message });
  }
});

module.exports = router;


module.exports = router;
