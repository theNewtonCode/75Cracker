const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


const router = express.Router();
const dataPath = path.join(__dirname, '../data/progress.json');
const usersDataPath = path.join(__dirname, '../data/users.json');
const questionsPath = path.join(__dirname, '../data/questions.json');

const SECRET_PASSWORD = process.env.SECRET_PASSWORD;

// Get all usernames
router.get('/users', (req, res) => {
  const jsonData = fs.readFileSync(usersDataPath);
  const users = JSON.parse(jsonData);
  res.json(users);
});

// Helper function to read data from JSON file
const readData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

// Helper function to write data to JSON file
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Get all users' progress
router.get('/', (req, res) => {
  const data = readData();
  res.json(data);
});

// Update a user's progress for a specific question
router.post('/update', (req, res) => {
  const { username, questionId, status } = req.body;

  const data = readData();
  if (!data.users[username]) {
    data.users[username] = {};
  }

  data.users[username][questionId] = status;

  writeData(data);
  res.json({ message: 'Progress updated successfully', data: data.users[username] });
});

// Get the list of questions
router.get('/questions', (req, res) => {
  const questionsData = fs.readFileSync(questionsPath);
  res.json(JSON.parse(questionsData));
});

// Add a new user (protected by secret password)
router.post('/add-user', (req, res) => {
  const { username, secretPassword } = req.body;

  if (secretPassword !== SECRET_PASSWORD) {
    return res.status(403).json({ message: 'Invalid secret password' });
  }

  const usersData = fs.readFileSync(usersDataPath);
  const users = JSON.parse(usersData);

  if (users.users.includes(username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.users.push(username);

  fs.writeFileSync(usersDataPath, JSON.stringify(users, null, 2));

  res.json({ message: 'User added successfully', users: users.users });
});

module.exports = router;
