// App.tsx
import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthContext } from './authService';
import LogIn from './components/LogIn';
import UserList from './components/UserList';
import { AuthState } from './interfaces';
import './styles/login.css';

function App() {

  //improve logged in logic
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false, user: null });

  //improve routing
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/users" element={<UserList />} />
          {/* add /register*/}
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
