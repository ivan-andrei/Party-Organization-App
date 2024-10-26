// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import MainPage from './MainPage';
import EventListPage from './EventListPage';

function App() {
  const [events, setEvents] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/main" 
          element={<MainPage events={events} setEvents={setEvents} />} 
        />
        <Route 
          path="/main/events" 
          element={<EventListPage events={events} />} 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
