import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(26, 26, 46, 0.8);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 255, 245, 0.3);
  border: 1px solid #00fff5;
`;

const FormTitle = styled.h3`
  color: #00fff5;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 255, 245, 0.7);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #00fff5;
  text-transform: uppercase;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  background-color: rgba(0, 255, 245, 0.1);
  border: 1px solid #00fff5;
  border-radius: 4px;
  font-size: 1rem;
  color: #00fff5;
  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 255, 245, 0.5);
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  background-color: rgba(0, 255, 245, 0.1);
  border: 1px solid #00fff5;
  border-radius: 4px;
  font-size: 1rem;
  color: #00fff5;
  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 255, 245, 0.5);
  }
    option {
    background-color: rgba(0, 0, 0, 0.8);  // Dark background for the dropdown options
    color: #00fff5;
  }
`;

const Button = styled.button`
  background-color: #ff0080;
  color: #00fff5;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: max-content;
  margin: auto;
  margin-top: 1rem;
  &:hover {
    background-color: #00fff5;
    color: #ff0080;
    box-shadow: 0 0 15px rgba(0, 255, 245, 0.7);
  }
`;

const UpdateProgressForm = ({ username, questions, progress, onProgressUpdate }) => {
  const [questionId, setQuestionId] = useState('');
  const [status, setStatus] = useState('');

  const unsolvedQuestions = questions.filter(
    (question) => {
      const id = Object.keys(question)[0];
      return !progress[id] || progress[id] !== 'solved';
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/progress/update', { username, questionId, status })
      .then((response) => {
        onProgressUpdate(response.data.data);
        setQuestionId('');
        setStatus('');
      })
      .catch((error) => {
        console.error('Error updating progress:', error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Update Your Progress</FormTitle>
      <FormGroup>
        <Label>Hacker ID:</Label>
        <Input type="text" value={username} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Challenge:</Label>
        <Select value={questionId} onChange={(e) => setQuestionId(e.target.value)} required>
          <option value="">Select Challenge</option>
          {unsolvedQuestions.map((question) => {
            const id = Object.keys(question)[0];
            const name = question[id];
            return (
              <option key={id} value={id}>
                {`Challenge ${id}: ${name}`}
              </option>
            );
          })}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Status:</Label>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Select status</option>
          <option value="stuck">Stuck</option>
          <option value="solved">Conquered</option>
        </Select>
      </FormGroup>
      <Button type="submit">Log Progress</Button>
    </Form>
  );
};

export default UpdateProgressForm;