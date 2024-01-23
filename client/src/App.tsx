import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import * as io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import LogIn from './components/LogIn';
import UserList from './components/UserList';
import { User } from './interfaces';
import './styles/App.css';
import './styles/login.css';

const App: React.FC = () => {
    const socket: Socket = io.connect('http://localhost:3001');
    const [userData, setUserData] = useState<any>({
        first_name: '',
        last_name: '',
        email:'',
        password: '',
        gender: '',
        role: '',
    });
    const [loginMessage] = useState('');
    const [showTable, setShowTable] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const ShowLogin =(value: boolean)=> {
      setIsLogin(value);
    }

    const login = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent page reload
        if (userData.email && userData.password) {
            socket.emit('log_in', { email: userData.email, password: userData.password });
            
            socket.on('login_response', (message, user) => {
                if (message === 'Success') {
                    setUserData(user); // Update user data in the state
                    setShowTable(true); // Show the table after successful login
                    localStorage.setItem('isLoggedIn', 'true');
                } else {
                    alert(message);
                }
            });
        } else {
            alert('Please enter email and password');
        }
    };

    const register = (event:  FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent page reload
        const notEmpty = (fieldValue: any) => !!fieldValue;
        let fieldsFilled = true;

        // Check if all required fields are filled
        for (const key in userData) {
            if (!notEmpty(userData[key])) {
                fieldsFilled = false;
                break; // Break the loop if any field is empty
            }
        }
        if (fieldsFilled) {
            socket.emit('register', userData);
            localStorage.setItem('userData', JSON.stringify(userData));
            setShowTable(true); // Set showTable to true upon successful register
        } else {
            alert('Please fill out the fields');
        }
    };

    const logout = () => {
        // Reset userData state
        const resetData: Partial<User> = {};
        Object.keys(userData).forEach(key => {
            resetData[key as keyof User] = ''; // Set each field to an empty string
        });
        setUserData(resetData as User);
        
        // Hide the table and remove user data from local storage
        setShowTable(false);
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
    },[]);

    return (
        <div>
            {!showTable ? (
                <LogIn
                    isLogin={isLogin}
                    userData={userData}
                    setUserData={setUserData}
                    login={login}
                    register={register}
                    ShowLogin={ShowLogin}
                />
            ) : (
                <Container className="mt-4 chat-window">
                    <Card>
                        <Card.Header className='chat-header d-flex justify-content-between align-items-center'>
                            <h5>Welcome {loginMessage || ('back ' + userData.first_name + ' ' + userData.last_name + '!')} ({userData.role})</h5>
                            <Button className='logout-button' variant="success" onClick={logout}><b>Log out</b></Button>
                        </Card.Header>
                    </Card>
                    <UserList userData={userData}/>
                    <div>Email: {userData.email}</div>
                    <div>Password: {userData.password}</div>
                    <div>Gender: {userData.gender}</div>
                    <div></div>
                    <div></div>
                </Container>
            )}
        </div>
    );
}

export default App;
