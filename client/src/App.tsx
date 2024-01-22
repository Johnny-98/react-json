import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import * as io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import LogIn from './components/LogIn';
import UserList from './components/UserList';
import './styles/App.css';
import './styles/login.css';

const App: React.FC = () => {
  const socket: Socket = io.connect('http://localhost:3001')
  const[username, setUsername] = useState('');
  const[loginMessage, setLoginMessage] = useState('');
  const[showTable, setShowTable] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const ShowLogin =(value: boolean)=> {
    setIsLogin(value);
    console.log('Is shown', isLogin);
  }

  const login = () => {
    if(username !== '') {
      socket.emit('log_in', username);
      localStorage.setItem('username', username);
    }
  };

  const logout = () => {
    if(username !== '') {
      socket.emit('log_out', username);
      setShowTable(false);
      setUsername('');
      localStorage.removeItem('username');
    }
  };

  // login check
  useEffect(() => {
    socket.on('logged_in', (message: string) => {
      setLoginMessage(message);
      setShowTable(true); // Show the chat when the user is logged in
    });

    socket.on('users_update', (usersArray: string[]) => {
      if (usersArray.length === 0) {
        setShowTable(false); // Hide the chat when the users array is empty
      }
    });
  }, [socket]);


  //browser remembers users who logged in
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    // const savedChatHistory = localStorage.getItem('chatHistory');
    if (savedUsername) {
      setUsername(savedUsername);
      setShowTable(true);
    }
  }, []);

return (
  <div>
    {!showTable ? (
      <LogIn
      isLogin={isLogin}
      username={username}
      setUsername={setUsername}
      login={login}
      ShowLogin={ShowLogin}
      />
      ):(
        <Container className="mt-4 chat-window">
          <Card>
            <Card.Header className='chat-header d-flex justify-content-between align-items-center'>
              <h5>Welcome {loginMessage || ('back ' + username + '!')}</h5>
              <Button className='logout-button' variant="success" onClick={logout}><b>Log out</b></Button>
            </Card.Header>
          </Card>
          <UserList/>
        </Container>
    )}
  </div>
);
}

export default App;
