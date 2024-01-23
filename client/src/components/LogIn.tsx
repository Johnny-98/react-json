import React, { FormEvent } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

interface LoginRegisterProps {
    isLogin: boolean;
    ShowLogin: (value: boolean) => void;
    userData: any;
    setUserData: (userData: any) => void;
    login: (event: FormEvent<HTMLFormElement>) => void;
    register: (event: FormEvent<HTMLFormElement>) => void;
}

const LoginRegister: React.FC<LoginRegisterProps> = ({ isLogin, ShowLogin, userData, setUserData, login, register }) => {

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    return (
        <div>
            {isLogin ? (
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
                                      value={userData.first_name}
                                      onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                  <Form.Label>Last Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="last_name"
                                    value={userData.last_name}
                                    onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                  <Form.Label>Email</Form.Label>
                                  <Form.Control
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={userData.password}
                                        onChange={handleChange}
                                    />
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
                                      checked={userData.gender === gender}
                                      onChange={() => setUserData({ ...userData, gender })}/>
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
                                        checked={userData.role === role} // Check if userData.role matches the current role
                                        onChange={() => setUserData({ ...userData, role })} // Update userData.role on change
                                      />
                                    ))}
                                  </div>
                                </Form.Group>
                                <Button variant="primary" type="submit" className='mt-3'> Register </Button>
                                <Button variant="link" type="submit" className='mt-3' onClick={() => ShowLogin(false)}>
                                  <b>Login</b>
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            ) : (
              <Container fluid>
                <Row>
                  <Col md={6} className="loginBoxStyle">
                    <Form onSubmit={login}>
                      <h2 className='d-flex justify-content-center'>Login</h2>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleChange}/>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={userData.password}
                          onChange={handleChange}/>
                      </Form.Group>
                      <Button variant="primary" type="submit" className='mt-3'>
                        Log In
                      </Button>
                      <Button variant="link" type="submit" className='mt-3' onClick={() => ShowLogin(true)}>
                        <b>Register</b>
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