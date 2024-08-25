import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;

const ChartTitle = styled.h2`
  text-align: center;
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ProgressChart = ({ users, totalQuestions }) => {
  const sortedUsers = [...users].sort((a, b) => b.solvedCount - a.solvedCount);
  const currentUser = localStorage.getItem('selectedUser');

  const data = {
    labels: sortedUsers.map(user => user.username),
    datasets: [
      {
        label: 'Questions Solved',
        data: sortedUsers.map(user => user.solvedCount),
        backgroundColor: sortedUsers.map(user => 
          user.username === currentUser 
            ? 'rgba(255, 99, 132, 0.8)' 
            : 'rgba(75, 192, 192, 0.8)'
        ),
        borderColor: sortedUsers.map(user => 
          user.username === currentUser 
            ? 'rgba(255, 99, 132, 1)' 
            : 'rgba(75, 192, 192, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.x} / ${totalQuestions} questions solved`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: totalQuestions,
        title: {
          display: true,
          text: 'Questions Solved',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          stepSize: Math.ceil(totalQuestions / 10),
        },
      },
      y: {
        title: {
          display: true,
          text: 'Users',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <ChartContainer>
      <ChartTitle>User Progress Comparison</ChartTitle>
      <div style={{ height: `${Math.max(300, users.length * 40)}px` }}>
        <Bar data={data} options={options} />
      </div>
    </ChartContainer>
  );
};

export default ProgressChart;