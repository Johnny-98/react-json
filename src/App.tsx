// App.tsx
import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthContext, AuthState } from './authService';
import LogIn from './components/LogIn';
import UserList from './components/UserList';

function App() {
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false, user: null });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/users" element={<UserList />} />
          {/* ... other routes ... */}
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
