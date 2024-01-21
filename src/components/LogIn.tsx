// 'Log in' page for the authentication
import Cookies from 'js-cookie';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authService';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { auth, setAuth } = useContext(AuthContext); // Access auth from context
  const navigate = useNavigate();

  const ShowLogin =(value: boolean)=> {
    setIsLogin(value);
    console.log('Is shown', isLogin);
  }

  useEffect(() => {
    const userCookie = Cookies.get('userAuth');
    if (userCookie) {
      const userAuth = JSON.parse(userCookie);
      auth.isAuthenticated = userAuth.isAuthenticated;
      auth.user = userAuth.user;
      navigate('/users'); // Redirect to a dashboard or home page
    }
  }, [auth, navigate]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let user;
    if (email === 'admin@admin' && password === 'admin') {
      user = { username: 'admin', role: 'admin' };
    } 
    else if (email === 'super@super' && password === 'super') {
      user = { username: 'super', role: 'super_user' };
    }
    else {
      user = { username: 'user', role: 'user' };
    }

    // Update the auth state
    setAuth({ isAuthenticated: true, user });

    // Set a cookie that expires in 30 minutes
    const expires = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 minutes from now
    Cookies.set('userAuth', JSON.stringify({ isAuthenticated: true, user }), { expires });

    navigate('/users');
  };

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

