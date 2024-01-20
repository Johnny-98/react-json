// src/components/LogIn.tsx

import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../authService';

const LogIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const ShowLogin =(value: boolean)=> {
    setIsLogin(value);
    console.log('Is shown', isLogin);
  }

  const handleLogin = () => {
    if (authenticate(email, password)) {
      navigate('/user-list');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegister = () => {
    return;
  }

  return (
    <div>
      {isLogin ? (        
        <Container fluid>
          <Row>
            <Col md={6} className="loginBoxStyle">
              <Form>
                <h2>Login</h2>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="name@example.com" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-3' onClick={handleLogin}>
                  Log In
                </Button>
                <Button variant="link" type="submit" className='mt-3' onClick={() => ShowLogin(false)}>
                  <b>Register</b>
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      ):(
        <Container fluid>
          <Row>
            <Col md={6} className="loginBoxStyle">
              <Form>
                <h2>Register</h2>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="string" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="string" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="name@example.com" />
                </Form.Group>
                <div key='inline-radio' className="mb-3">
                  <Form.Check
                    inline
                    label="Male"
                    name="group1"
                    type='radio'
                  />
                  <Form.Check
                    inline
                    label="Female"
                    name="group1"
                    type='radio'
                  />
                  <Form.Check
                    inline
                    label="Other"
                    name="group1"
                    type='radio'
                  />
                  <Form.Check
                    inline
                    label="Don't Specify"
                    name="group1"
                    type='radio'
                  />
                </div>
                <Button variant="primary" type="submit" className='mt-3' onClick={handleRegister}>
                  Register
                </Button>
                <Button variant="link" type="submit" className='mt-3' onClick={() => ShowLogin(true)}>
                  <b>Log In</b>
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default LogIn;

