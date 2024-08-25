// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import ProgressTracker from './components/ProgressTracker';
import Home from './components/Home';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/progress-tracker" element={<ProgressTracker />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;