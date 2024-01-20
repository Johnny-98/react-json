import React, { useState } from 'react';
import './styles/App.css';
import './styles/login.css';

function App() {
  const [showUsers, setShowUsers] = useState(false);

  const logMessage = () => {
    setShowUsers(true);
    console.log('Is shown', showUsers);
  }

  return (
    <div>
    {!showUsers ? (
      <div className="app-background">
        <div className=" background">
          <div className="form-card">
            <h1 className="form-title">
                Welcome
            </h1>
            <div className="form-subtitle">
              Enter your name to get started
            </div>
            <div className="auth">
                <div className="auth-label">Username</div>
                <div>
                <input 
                  className="auth-input" 
                  name="username" 
                  type='text'  
                  placeholder='type username' />
                </div>
                <button className="auth-button" type="submit" onClick={logMessage}>Enter</button>
            </div>
          </div>
        </div>
      </div>
      ):(
        <div>Hello</div>
    )}
  </div>
  );
}

export default App;
