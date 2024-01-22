// 'Log in' page for the authentication
import { FormEvent, useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authService';
import { User } from '../interfaces';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { setAuth } = useContext(AuthContext); // Access auth from context

  const [formData, setFormData] = useState<User>({
    id: Date.now(),
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    role: '',
    password: ''
  });

  const navigate = useNavigate();

  // switch from log to reg
  const ShowLogin =(value: boolean)=> {
    setIsLogin(value);
    console.log('Is shown', isLogin);
  }

  useEffect(() => {
    const userAuthData = localStorage.getItem('userAuth');
    if (userAuthData) {
      const userAuth = JSON.parse(userAuthData);
      if (userAuth.isLoggedIn) {
        setAuth(userAuth); // Update auth context with stored data
        navigate('/users'); // Redirect to users page
      }
    }
  }, [setAuth, navigate]);

  // login
  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let user: any;
    if (email === 'admin@admin' && password === 'admin') {
      user = { id: '111', first_name: 'Admin',last_name: 'Jotaro', email: 'admin@admin',gender: 'male', role: 'admin', password: 'admin'};
    } 
    else if (email === 'super@super' && password === 'super') {
      user = { id: '222', first_name: 'Super',last_name: 'Dio', email: 'super@super',gender: 'other', role: 'super_user', password: 'super'};
    }
    // else {
    //   user = { username: 'user', role: 'user' };
    // }
    // Update the auth state
    setAuth({ isLoggedIn: true, user });
    localStorage.setItem('userAuth', JSON.stringify({ isLoggedIn: true, user }));
    navigate('/users');
  };

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
              <Form onSubmit={login}>
                <h2 className='d-flex justify-content-center'>Login</h2>
                <Form.Group className="mb-3 mt-3">
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

export default LogIn;

