import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import * as io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import LogIn from './components/LogIn';
import UserList from './components/UserList';
import { User } from './interfaces';
import './styles/App.css';
import './styles/login.css';

const initialLoginUserData = {
    email: '',
    password: '',
};

const initialRegisterUserData = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    gender: '',
    role: '',
};

const clearUserData = (isLogin: boolean, setUserData: any ) => {
    if (isLogin) {
        setUserData({ ...initialLoginUserData });
    } else {
        setUserData({ ...initialRegisterUserData });
    }
};

const App: React.FC = () => {
    const socket: Socket = io.connect('http://localhost:3001');

    // Separate userData states for Register and Login forms
    const [loginUserData, setLoginUserData] = useState<any>(initialLoginUserData)
    const [registerUserData, setRegisterUserData] = useState<any>(initialRegisterUserData)

    const [loginMessage] = useState('');
    const [showTable, setShowTable] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const ShowLogin = (value: boolean) => {
        setIsLogin(value);
        clearUserData(value, isLogin ? setLoginUserData : setRegisterUserData);
    };

    const login = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent page reload
        if (loginUserData.email && loginUserData.password) {
            socket.emit('log_in', { email: loginUserData.email, password: loginUserData.password });

            socket.on('login_response', (message, user) => {
                if (message === 'Success') {
                    // Update user data in the state
                    setLoginUserData(user);
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

    const register = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent page reload
        const notEmpty = (fieldValue: any) => !!fieldValue;
        let fieldsFilled = true;

        // Check if all required fields are filled
        for (const key in registerUserData) {
            if (!notEmpty(registerUserData[key])) {
                fieldsFilled = false;
                break; // Break the loop if any field is empty
            }
        }

        if (fieldsFilled) {
            socket.emit('register', registerUserData);

            socket.on('registration_response', (message, newUser) => {
                if (message === 'User exists') {
                    alert('User with the same information already exists.');
                } else if (message === 'Email exists') {
                    alert('Email already used.');
                } else {
                    // Update user data in the state
                    setLoginUserData(newUser);
                    setShowTable(true); // Set showTable to true upon successful register
                    localStorage.setItem('isLoggedIn', 'true');
                }
            });
        } else {
            alert('Please fill out all fields');
        }
    };

    const logout = () => {
        // Reset userData state
        const resetData: Partial<User> = {};
        Object.keys(loginUserData).forEach(key => {
            resetData[key as keyof User] = ''; // Set each field to an empty string
        });
        setLoginUserData(resetData as User);

        // Hide the table and remove user data from local storage
        setShowTable(false);
        localStorage.removeItem('userData');
    };

    useEffect(() => {
        const savedUserData = localStorage.getItem('userData');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (savedUserData && isLoggedIn === 'true') {
            const parsedUserData = JSON.parse(savedUserData);
            setLoginUserData(parsedUserData);
            setShowTable(true); // Set showTable to true if the user is already logged in
        }
    }, []);

    return (
        <div>
            {!showTable ? (
                <LogIn
                    isLogin={isLogin}
                    userData={isLogin ? loginUserData : registerUserData}
                    setUserData={isLogin ? setLoginUserData : setRegisterUserData}
                    login={login}
                    register={register}
                    ShowLogin={ShowLogin}
                />
            ) : (
                <Container className="mt-4 chat-window">
                    <Card>
                        <Card.Header className='chat-header d-flex justify-content-between align-items-center'>
                            <h5>
                                Welcome {loginMessage || ('back ' + loginUserData.first_name + ' ' + loginUserData.last_name + '!')} ({loginUserData.role})
                            </h5>
                            <Button className='logout-button' variant="success" onClick={logout}><b>Log out</b></Button>
                        </Card.Header>
                    </Card>
                    <UserList userData={loginUserData} />
                    <div>Email: {loginUserData.email}</div>
                    <div>Password: {loginUserData.password}</div>
                    <div>Gender: {loginUserData.gender}</div>
                    <div></div>
                    <div></div>
                </Container>
            )}
        </div>
    );
};

export default App;
