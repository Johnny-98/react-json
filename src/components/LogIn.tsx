// 'Log in' page for the authentication
import React, { FormEvent, useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authService';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { auth } = useContext(AuthContext); // Access auth from context
  const navigate = useNavigate();

  const ShowLogin =(value: boolean)=> {
    setIsLogin(value);
    console.log('Is shown', isLogin);
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate role based access(improve)
    if (email === 'admin@admin' && password === 'admin') {
      auth.isAuthenticated = true;
      auth.user = { username: 'admin', role: 'admin' };
      navigate('/users');
    } 
    else if (email === 'super@super' && password === 'super') {
      auth.isAuthenticated = true;
      auth.user = { username: 'super', role: 'super_user' };
      navigate('/users');
    }
    else {
      auth.isAuthenticated = true;
      auth.user = { username: 'user', role: 'user' };
      navigate('/users');
    }
  };

  //improve frontend
  return (
    <div>
      {isLogin ? (      
        <Container fluid>
          <Row>
            <Col md={6} className="loginBoxStyle">
              <Form onSubmit={handleLogin}>
                <h2>Login</h2>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="name@example.com" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-3'>
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
                <Button variant="primary" type="submit" className='mt-3'>
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

