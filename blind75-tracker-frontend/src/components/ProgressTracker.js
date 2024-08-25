import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UserProgress from './UserProgress';
import UpdateProgressForm from './UpdateProgressForm';
import ProgressChart from './ProgressChart';
import { useTheme } from '../ThemeContext';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Orbitron', sans-serif;
  background-color: ${({ isDarkMode }) => isDarkMode ? '#0a0a1f' : '#0f4c75'};
  color: ${({ isDarkMode }) => isDarkMode ? '#00fff5' : '#e0e0e0'};
  min-height: 100vh;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
`;

const Title = styled.h1`
  text-align: center;
  color: #00fff5;
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5);
`;

const Section = styled.section`
  background-color: ${({ isDarkMode }) => isDarkMode ? '#1a1a2e' : '#16213e'};
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #00fff5;
`;

const SectionTitle = styled.h2`
  color: #00fff5;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Branding = styled.p`
  color: #00fff5;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
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
      <Title isDarkMode={isDarkMode}>Prep Challenge Tracker</Title>
      <Branding>
      Engineered by{' '}
      <Link 
        to="https://github.com/theNewtonCode" 
        style={{ color: '#ff0080', textDecoration: 'none' }}
      >
        theNewtonCode | Abhyuday
      </Link>
    </Branding>
      
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
        <SectionTitle isDarkMode={isDarkMode}>Global Hacker Matrix</SectionTitle>
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