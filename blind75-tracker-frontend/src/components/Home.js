import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../ThemeContext';

const glitch = keyframes`
  0% {
    clip: rect(64px, 9999px, 66px, 0);
  }
  5% {
    clip: rect(30px, 9999px, 36px, 0);
  }
  10% {
    clip: rect(87px, 9999px, 76px, 0);
  }
  15% {
    clip: rect(56px, 9999px, 53px, 0);
  }
  20% {
    clip: rect(28px, 9999px, 16px, 0);
  }
  25% {
    clip: rect(60px, 9999px, 73px, 0);
  }
  30% {
    clip: rect(57px, 9999px, 62px, 0);
  }
  35% {
    clip: rect(56px, 9999px, 58px, 0);
  }
  40% {
    clip: rect(80px, 9999px, 70px, 0);
  }
  45% {
    clip: rect(35px, 9999px, 39px, 0);
  }
  50% {
    clip: rect(82px, 9999px, 82px, 0);
  }
  55% {
    clip: rect(33px, 9999px, 33px, 0);
  }
  60% {
    clip: rect(31px, 9999px, 31px, 0);
  }
  65% {
    clip: rect(28px, 9999px, 28px, 0);
  }
  70% {
    clip: rect(65px, 9999px, 70px, 0);
  }
  75% {
    clip: rect(75px, 9999px, 76px, 0);
  }
  80% {
    clip: rect(8px, 9999px, 9px, 0);
  }
  85% {
    clip: rect(39px, 9999px, 40px, 0);
  }
  90% {
    clip: rect(32px, 9999px, 35px, 0);
  }
  95% {
    clip: rect(49px, 9999px, 52px, 0);
  }
  100% {
    clip: rect(14px, 9999px, 15px, 0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${({ isDarkMode }) =>
    isDarkMode
      ? 'linear-gradient(135deg, #0a0a2a 0%, #1a1a4a 100%)'
      : 'linear-gradient(135deg, #2a2a6a 0%, #4a4a8a 100%)'};
    color: ${({ isDarkMode }) =>
    isDarkMode
      ? '#00fff5'
      : '#0080ff'};
  overflow: hidden;
  position: relative;
`;

const CyberGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 245, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 245, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 1;
`;

const Content = styled.div`
  z-index: 2;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 5px;

  text-shadow: 
    0 0 5px #00fff5,
    0 0 10px #00fff5,
    0 0 20px #00fff5,
    0 0 40px #00fff5;
  position: relative;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip: rect(0, 0, 0, 0);
  }

  &::before {
    left: 2px;
    text-shadow: -2px 0 #ff00de;
    animation: ${glitch} 2s infinite linear alternate-reverse;
  }

  &::after {
    left: -2px;
    text-shadow: 2px 0 #00fff5;
    animation: ${glitch} 3s infinite linear alternate-reverse;
  }
`;

const Select = styled.select`
  width: 300px;
  padding: 12px;
  font-size: 1rem;
  border: 2px solid #00fff5;
  border-radius: 8px;
  background-color: rgba(0, 255, 245, 0.1);
  color: #00fff5;
  
  box-shadow: 0 0 10px rgba(0, 255, 245, 0.5);
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 255, 245, 0.7);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 30px rgba(0, 255, 245, 0.9);
  }
`;

const Option = styled.option`
  background-color: #0a0a2a;
  color: #00fff5;
`;

const ThemeToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  border: 2px solid #00fff5;
  border-radius: 20px;
  background-color: rgba(0, 255, 245, 0.1);
  color: #00fff5;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;

  &:hover {
    background-color: rgba(0, 255, 245, 0.3);
    box-shadow: 0 0 15px rgba(0, 255, 245, 0.7);
  }
`;

const Branding = styled.p`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  color: #00fff5;
  text-shadow: 0 0 5px #00fff5;
  z-index: 3;
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
      <CyberGrid />
      <ThemeToggle isDarkMode={isDarkMode} onClick={toggleTheme}>
        {isDarkMode ? '🌞 Light Grid' : '🌙 Dark Grid'}
      </ThemeToggle>
      <Content>
        <Title data-text="Cyber Challenge Tracker">Cyber Challenge Tracker</Title>
        <Select isDarkMode={isDarkMode} value={selectedUser} onChange={handleUserChange}>
          <Option value="">Select Hacker</Option>
          {users.map((user) => (
            <Option key={user} value={user}>
              {user}
            </Option>
          ))}
        </Select>
      </Content>
      <Branding>Engineered by <span style={{ color: '#ff00de' }}>theNewtonCode | Abhyuday</span></Branding>
    </Container>
  );
}