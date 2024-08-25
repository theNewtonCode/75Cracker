import React, { useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px #00fff5, 0 0 10px #00fff5, 0 0 15px #00fff5, 0 0 20px #00fff5; }
  50% { box-shadow: 0 0 10px #00fff5, 0 0 15px #00fff5, 0 0 20px #00fff5, 0 0 25px #00fff5; }
  100% { box-shadow: 0 0 5px #00fff5, 0 0 10px #00fff5, 0 0 15px #00fff5, 0 0 20px #00fff5; }
`;

const Container = styled.div`
  padding: 40px;
  max-width: 500px;
  margin: auto;
  background: rgba(10, 10, 42, 0.8);
  border-radius: 15px;
  border: 2px solid #00fff5;
  box-shadow: 0 0 20px rgba(0, 255, 245, 0.3);
`;

const Title = styled.h2`
  color: #00fff5;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 10px #00fff5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: #00fff5;
  margin-bottom: 5px;
  display: block;
  font-size: 1.1rem;
  text-transform: uppercase;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(0, 255, 245, 0.1);
  border: 1px solid #00fff5;
  border-radius: 5px;
  color: #00fff5;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 15px rgba(0, 255, 245, 0.5);
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background: #ff00de;
  color: #00fff5;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 10px;

  &:hover {
    background: #00fff5;
    color: #ff00de;
    animation: ${glowAnimation} 1.5s infinite;
  }
`;

const Message = styled.p`
  margin-top: 20px;
  color: #00ff00;
  text-align: center;
  font-size: 1.1rem;
  text-shadow: 0 0 5px #00ff00;
`;

function AddUser() {
  const [username, setUsername] = useState('');
  const [secretPassword, setSecretPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-user`, {
        username,
        secretPassword,
      });

      setResponseMessage(response.data.message);
      setUsername('');
      setSecretPassword('');
    } catch (error) {
      setResponseMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Container>
      <Title>Register New Hacker</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Hacker ID:</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Encryption Key:</Label>
          <Input
            type="password"
            value={secretPassword}
            onChange={(e) => setSecretPassword(e.target.value)}
            required
          />
        </InputGroup>
        <Button type="submit">Initialize Hacker</Button>
      </Form>
      {responseMessage && <Message>{responseMessage}</Message>}
    </Container>
  );
}

export default AddUser;