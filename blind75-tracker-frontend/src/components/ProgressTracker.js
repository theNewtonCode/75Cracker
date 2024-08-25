import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UserProgress from './UserProgress';
import UpdateProgressForm from './UpdateProgressForm';
import ProgressChart from './ProgressChart';
import { useTheme } from '../ThemeContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  background-color: ${({ isDarkMode }) => isDarkMode ? '#1a1a1a' : '#f5f5f5'};
  color: ${({ isDarkMode }) => isDarkMode ? '#91ff00' : '#333'};
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ isDarkMode }) => isDarkMode ? '#f5f5f5' : '#91ff00'};
  margin-bottom: 2rem;
`;

const Section = styled.section`
  background-color: ${({ isDarkMode }) => isDarkMode ? '#2c2c2c' : '#fff'};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, ${({ isDarkMode }) => isDarkMode ? '0.3' : '0.1'});
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${({ isDarkMode }) => isDarkMode ? '#f5f5f5' : '#444'};
  margin-bottom: 1rem;
`;

const ProgressTracker = () => {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(localStorage.getItem('selectedUser') || '');

  useEffect(() => {
    axios.get('http://localhost:5000/api/progress/questions').then((response) => {
      setQuestions(response.data.questions);
    });

    axios.get('http://localhost:5000/api/progress/users').then((response) => {
      setUsers(response.data.users);
    });

    if (selectedUser) {
      fetchData();
    }
  }, [selectedUser]);

  const fetchData = () => {
    axios.get('http://localhost:5000/api/progress').then((response) => {
      setData(response.data.users);
    });
  };

  const handleProgressUpdate = () => {
    fetchData();
  };

  return (
    <Container isDarkMode={isDarkMode}>
      <Title isDarkMode={isDarkMode}>Blind 75 Tracker</Title>
      
      {selectedUser && (
        <Section isDarkMode={isDarkMode}>
          <UpdateProgressForm
            username={selectedUser}
            questions={questions}
            progress={data[selectedUser] || {}}
            onProgressUpdate={handleProgressUpdate}
            isDarkMode={isDarkMode}
          />
          <UserProgress 
            username={selectedUser} 
            progress={data[selectedUser] || {}} 
            isDarkMode={isDarkMode}
          />
        </Section>
      )}
      
      <Section isDarkMode={isDarkMode}>
        <SectionTitle isDarkMode={isDarkMode}>Overall Progress</SectionTitle>
        <ProgressChart
          users={users.map(user => ({
            username: user,
            solvedCount: Object.values(data[user] || {}).filter(status => status === 'solved').length,
          }))}
          totalQuestions={questions.length}
          isDarkMode={isDarkMode}
        />
      </Section>
    </Container>
  );
};

export default ProgressTracker;