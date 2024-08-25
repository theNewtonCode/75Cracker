import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  margin-top: 2rem;
  background-color: ${props => props.isDarkMode ? '#2c2c2c' : '#f9f9f9'};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, ${props => props.isDarkMode ? '0.3' : '0.1'});
`;

const Username = styled.h2`
  color: ${props => props.isDarkMode ? '#f5f5f5' : '#333'};
  margin-bottom: 1rem;
`;

const QuestionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const QuestionItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: ${props => 
    props.status === 'stuck' 
      ? (props.isDarkMode ? '#3a2222' : '#fff0f0')
      : 'transparent'
  };
  border-radius: 4px;
  color: ${props => props.isDarkMode ? '#f5f5f5' : '#333'};
`;

const StatusIndicator = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: ${props => 
    props.status === 'solved' ? '#4CAF50' : 
    props.status === 'stuck' ? '#FF4136' : 
    '#FFA500'};
`;

const StuckIcon = styled.span`
  color: #FF4136;
  margin-left: 10px;
  font-weight: bold;
`;

const UserProgress = ({ username, progress, isDarkMode }) => {
  return (
    <ProgressContainer isDarkMode={isDarkMode}>
      <Username isDarkMode={isDarkMode}>{username}'s Progress</Username>
      <QuestionList>
        {Object.entries(progress).map(([questionId, status]) => (
          <QuestionItem key={questionId} status={status} isDarkMode={isDarkMode}>
            <StatusIndicator status={status} />
            Question {questionId}: {status}
            {status === 'stuck' && <StuckIcon>⚠️ Stuck</StuckIcon>}
          </QuestionItem>
        ))}
      </QuestionList>
    </ProgressContainer>
  );
};

export default UserProgress;