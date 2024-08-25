import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProgress from './UserProgress';
import UpdateProgressForm from './UpdateProgressForm';

const ProgressTracker = () => {
  const [data, setData] = useState({});

  const fetchData = () => {
    axios.get('/api/progress').then((response) => {
      setData(response.data.users);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProgressUpdate = (updatedData) => {
    // Re-fetch data or update state with the new data directly
    fetchData();
  };

  return (
    <div>
      <h1>Blind 75 Tracker</h1>
      <UpdateProgressForm onProgressUpdate={handleProgressUpdate} />
      <div>
        {Object.keys(data).map((user) => (
          <UserProgress key={user} username={user} progress={data[user]} />
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
