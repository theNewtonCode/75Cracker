import React, { useState } from 'react';
import axios from 'axios';

const UpdateProgressForm = ({ onProgressUpdate }) => {
  const [username, setUsername] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make the API request to update progress
    axios
      .post('/api/progress/update', { username, questionId, status })
      .then((response) => {
        onProgressUpdate(response.data.data); // Update the state with the new data
        setUsername('');
        setQuestionId('');
        setStatus('');
      })
      .catch((error) => {
        console.error('Error updating progress:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Your Progress</h3>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Question ID:</label>
        <input
          type="text"
          value={questionId}
          onChange={(e) => setQuestionId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Select status</option>
          <option value="solved">Solved</option>
          <option value="stuck">Stuck</option>
          <option value="unsolved">Unsolved</option>
        </select>
      </div>
      <button type="submit">Update Progress</button>
    </form>
  );
};

export default UpdateProgressForm;
