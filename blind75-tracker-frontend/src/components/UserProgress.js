import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  margin-top: 2rem;
  background-color: rgba(26, 26, 46, 0.8);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 0 20px rgba(0, 255, 245, 0.3);
  border: 1px solid #00fff5;
`;

const Username = styled.h2`
  color: #00fff5;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 255, 245, 0.7);
`;

const QuestionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const QuestionItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  background-color: ${props => 
    props.status === 'stuck' 
      ? 'rgba(255, 0, 128, 0.2)'
      : 'rgba(0, 255, 245, 0.1)'
  };
  border-radius: 4px;
  color: #00fff5;
  border: 1px solid ${props => 
    props.status === 'solved' ? '#00ff00' : 
    props.status === 'stuck' ? '#ff0080' : 
    '#ffa500'};
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 0 15px rgba(0, 255, 245, 0.5);
  }
`;

const StatusIndicator = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: ${props => 
    props.status === 'solved' ? '#00ff00' : 
    props.status === 'stuck' ? '#ff0080' : 
    '#ffa500'};
  box-shadow: 0 0 10px ${props => 
    props.status === 'solved' ? 'rgba(0, 255, 0, 0.7)' : 
    props.status === 'stuck' ? 'rgba(255, 0, 128, 0.7)' : 
    'rgba(255, 165, 0, 0.7)'};
`;

const StuckIcon = styled.span`
  color: #ff0080;
  margin-left: 10px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(255, 0, 128, 0.7);
`;

const UserProgress = ({ username, progress }) => {
  return (
    <ProgressContainer>
      <Username>{username}'s Hacking Progress</Username>
      <QuestionList>
        {Object.entries(progress).map(([questionId, status]) => (
          <QuestionItem key={questionId} status={status}>
            <StatusIndicator status={status} />
            Challenge {questionId}: {status.charAt(0).toUpperCase() + status.slice(1)}
            {status === 'stuck' && <StuckIcon>⚠️ Hurry Up, Finish it!</StuckIcon>}
          </QuestionItem>
        ))}
      </QuestionList>
    </ProgressContainer>
  );
};

export default UserProgress;