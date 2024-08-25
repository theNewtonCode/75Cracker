import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background: ${({ isDarkMode }) => 
    isDarkMode 
      ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
      : 'linear-gradient(135deg, #0f4c75 0%, #3282b8 100%)'};
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  border: 2px solid #00fff5;
`;

const ChartTitle = styled.h2`
  text-align: center;
  color: #00fff5;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.7);
`;

const ProgressChart = ({ users, totalQuestions, isDarkMode }) => {
  const sortedUsers = [...users].sort((a, b) => b.solvedCount - a.solvedCount);
  const currentUser = localStorage.getItem('selectedUser');

  const data = {
    labels: sortedUsers.map(user => user.username === currentUser ? 'YOU' : user.username.toUpperCase()),
    datasets: [
      {
        label: 'Challenges Completed',
        data: sortedUsers.map(user => user.solvedCount),
        backgroundColor: sortedUsers.map(user =>
          user.username === currentUser
            ? 'rgba(255, 0, 128, 0.8)'
            : 'rgba(0, 255, 245, 0.6)'
        ),
        borderColor: sortedUsers.map(user =>
          user.username === currentUser
            ? 'rgba(255, 0, 128, 1)'
            : 'rgba(0, 255, 245, 1)'
        ),
        borderWidth: 2,
        borderRadius: 5,
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#00fff5',
        bodyColor: '#ffffff',
        borderColor: '#00fff5',
        borderWidth: 1,
        callbacks: {
          label: (context) => `${context.parsed.x} / ${totalQuestions} challenges completed`,
          title: (tooltipItems) => {
            const username = sortedUsers[tooltipItems[0].dataIndex].username;
            return username === currentUser ? 'YOU' : username.toUpperCase();
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: totalQuestions,
        title: {
          display: true,
          text: 'CHALLENGES COMPLETED',
          color: '#00fff5',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          stepSize: Math.ceil(totalQuestions / 10),
          color: '#00fff5',
        },
        grid: {
          color: 'rgba(0, 255, 245, 0.2)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'HACKERS',
          color: '#00fff5',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          color: '#00fff5',
          font: {
            family: "'Courier New', monospace",
          },
        },
        grid: {
          color: 'rgba(0, 255, 245, 0.2)',
        },
      },
    },
  };

  return (
    <ChartContainer isDarkMode={isDarkMode}>
      <ChartTitle isDarkMode={isDarkMode}>Hacker Progress Matrix</ChartTitle>
      <div style={{ height: `${Math.max(300, users.length * 40)}px` }}>
        <Bar data={data} options={options} />
      </div>
    </ChartContainer>
  );
};

export default ProgressChart;