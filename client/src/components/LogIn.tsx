import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { User } from '../interfaces';

interface LoginRegisterProps {
  isLogin: boolean;
  username: string;
  setUsername: (username: string) => void;
  login: () => void;
  ShowLogin: (value: boolean) => void;
}

const LoginRegister: React.FC<LoginRegisterProps> = ({ isLogin, username, setUsername, login, ShowLogin }) => {
  const [formData, setFormData] = useState<User>({
    id: Date.now(),
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    role: '',
    password: ''
  });

  // register
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setFormData({
      ...formData,
      [name]: value // Use the name to set the correct state property
    });
  };

  const register = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Here you can also send formData to a backend server...
  };

  return (
    <div>
      {isLogin ? ( 
        <Container fluid>
            <Row>
              <Col md={6} className="loginBoxStyle">
                <Form onSubmit={register}>
                  <h2 className='d-flex justify-content-center'>Log In</h2>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      onChange={(event) => {
                        setUsername(event.target.value)
                      }}
                      onKeyDown={(event) => {
                        event.key === 'Enter' && login()
                      }}/>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}/>
                  </Form.Group>

                  <Button variant="primary" type="submit" className='mt-3' onClick={login}>
                    Login
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
                <Form onSubmit={register}>
                  <h2 className='d-flex justify-content-center'>Register</h2>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}/>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}/>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}/>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label><b>Gender</b> </Form.Label>
                    <div key='gender' className="mb-3">
                      {["Male", "Female", "Other", "Don't Specify"].map((gender) => (
                        <Form.Check 
                        inline 
                        key={gender}
                        label={gender} 
                        type="radio" 
                        id={`gender-${gender}`}
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}/>
                      ))}
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label><b>Role</b></Form.Label>
                    <div key='role' className="mb-3">
                      {["admin", "super-user", "user"].map((role) => (
                        <Form.Check 
                        inline 
                        key={role} 
                        label={role} 
                        type="radio" 
                        id={`role-${role}`}
                        value={role}
                        checked={formData.role === role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}/>
                      ))}
                    </div>
                  </Form.Group>
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

export default LoginRegister;