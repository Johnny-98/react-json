import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import * as io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import LogIn from './components/LogIn';
import UserList from './components/UserList';
import './styles/App.css';
import './styles/login.css';

const App: React.FC = () => {
    const socket: Socket = io.connect('http://localhost:3001');
    const [userData, setUserData] = useState<any>({
        name: '',
        password: '',
        role: ''
    });
    const [loginMessage, setLoginMessage] = useState('');
    const [showTable, setShowTable] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const ShowLogin =(value: boolean)=> {
      setIsLogin(value);
      console.log('Is shown', isLogin);
    }

    const login = (event:  FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Prevent page reload
      console.log('userData:', userData);
      if (userData.name !== '' && userData.password !== '' && userData.role !=='') {
          socket.emit('log_in', userData);
          localStorage.setItem('userData', JSON.stringify(userData));
          setShowTable(true); // Set showTable to true upon successful login
      }
  };

  const logout = () => {
    // Perform any necessary logout logic here.
    // For example, you can emit a 'log_out' event to the server.
    socket.emit('log_out', userData.name);

    // Clear user data and showTable state
    setUserData({ name: '', password: '', role:'' });
    setShowTable(false);

    // Remove user data from local storage
    localStorage.removeItem('userData');
};

    useEffect(() => {
        const savedUserData = localStorage.getItem('userData');
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (savedUserData && isLoggedIn === 'true') {
            const parsedUserData = JSON.parse(savedUserData);
            setUserData(parsedUserData);
            setShowTable(true); // Set showTable to true if the user is already logged in
        }
    }, []);

    return (
        <div>
            {!showTable ? (
                <LogIn
                    isLogin={isLogin}
                    userData={userData} // Pass userData object
                    setUserData={setUserData} // Function to set userData object
                    login={login}
                    ShowLogin={ShowLogin}
                />
            ) : (
                <Container className="mt-4 chat-window">
                    <Card>
                        <Card.Header className='chat-header d-flex justify-content-between align-items-center'>
                            <h5>Welcome {loginMessage || ('back user ' + userData.name + '!')} ({userData.role})</h5>
                            <Button className='logout-button' variant="success" onClick={logout}><b>Log out</b></Button>
                        </Card.Header>
                    </Card>
                    <UserList userData={userData}/>
                </Container>
            )}
        </div>
    );
}

export default App;
