import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
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
        <Label>Username:</Label>
        <Input type="text" value={username} readOnly />
      </FormGroup>
      <FormGroup>
        <Label>Question ID:</Label>
        <Select value={questionId} onChange={(e) => setQuestionId(e.target.value)} required>
          <option value="">Select Question</option>
          {unsolvedQuestions.map((question) => {
            const id = Object.keys(question)[0];
            const name = question[id];
            return (
              <option key={id} value={id}>
                {`Question ${id}: ${name}`}
              </option>
            );
          })}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Status:</Label>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Select status</option>
          <option value="solved">Solved</option>
          <option value="stuck">Stuck</option>
          <option value="unsolved">Unsolved</option>
        </Select>
      </FormGroup>
      <Button type="submit">Update Progress</Button>
    </Form>
  );
};

export default UpdateProgressForm;