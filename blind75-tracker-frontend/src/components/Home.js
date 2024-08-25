import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../ThemeContext';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${({ isDarkMode }) =>
    isDarkMode
      ? 'linear-gradient(135deg, #2c3e50 0%, #1a2a3a 100%)'
      : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'};
  animation: ${fadeIn} 1s ease-out;
  color: ${({ isDarkMode }) => (isDarkMode ? '#ffffff' : '#333333')};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: ${({ isDarkMode }) =>
    isDarkMode ? '2px 2px 4px rgba(0,0,0,0.5)' : '2px 2px 4px rgba(0,0,0,0.1)'};
`;

const Select = styled.select`
  width: 300px;
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#4a4a4a' : 'white')};
  color: ${({ isDarkMode }) => (isDarkMode ? '#ffffff' : '#333333')};
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 8px rgba(0,0,0,0.15);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #4CAF50;
  }
`;

const Option = styled.option`
  padding: 12px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#4a4a4a' : 'white')};
  color: ${({ isDarkMode }) => (isDarkMode ? '#ffffff' : '#333333')};
`;

const ThemeToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 20px;
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#f5f7fa' : '#2c3e50')};
  color: ${({ isDarkMode }) => (isDarkMode ? '#2c3e50' : '#f5f7fa')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(localStorage.getItem('selectedUser') || '');
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    axios.get('http://localhost:5000/api/progress/users').then((response) => {
      setUsers(response.data.users);
    });
  }, []);

  const handleUserChange = (e) => {
    const user = e.target.value;
    setSelectedUser(user);
    localStorage.setItem('selectedUser', user);
    navigate('/progress-tracker');
  };

  return (
    <Container isDarkMode={isDarkMode}>
      <ThemeToggle isDarkMode={isDarkMode} onClick={toggleTheme}>
        {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </ThemeToggle>
      <Title isDarkMode={isDarkMode}>Welcome to Blind 75 Tracker</Title>
      <Select isDarkMode={isDarkMode} value={selectedUser} onChange={handleUserChange}>
        <Option isDarkMode={isDarkMode} value="">Select User</Option>
        {users.map((user) => (
          <Option isDarkMode={isDarkMode} key={user} value={user}>
            {user}
          </Option>
        ))}
      </Select>
    </Container>
  );
}