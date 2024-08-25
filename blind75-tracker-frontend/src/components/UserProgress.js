import React from 'react';

const UserProgress = ({ username, progress }) => {
  return (
    <div>
      <h2>{username}</h2>
      <ul>
        {Object.entries(progress).map(([questionId, status]) => (
          <li key={questionId}>
            Question {questionId}: {status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProgress;
