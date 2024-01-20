import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LogIn from './components/LogIn';
import UserList from './components/UserList';
import './styles/login.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user-list" element={<UserList />} />
        <Route path="/" element={<LogIn />} />
      </Routes>
    </Router>
  );
};

export default App;
