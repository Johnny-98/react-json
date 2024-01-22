// page to list usersauth_user
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, fetchUsers } from '../authService';
import { User } from '../interfaces';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [local_user, setLocalUser] = useState<User | null>(null);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  useEffect(() => {
    const userAuthData = localStorage.getItem('userAuth');
    if (userAuthData) {
      try {
        const parsedAuthData = JSON.parse(userAuthData);
        if (parsedAuthData && parsedAuthData.user) {
          setLocalUser(parsedAuthData.user); // Update state
        }
      } catch (error) {
        console.error('Error parsing userAuth data:', error);
        setAuth({ isLoggedIn: false, user: null });
        navigate('/login');
      }
    } else {
      setAuth({ isLoggedIn: false, user: null });
      navigate('/login');
    }
  }, [setAuth, navigate]);
  

  //fetch json data
  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);


  //reset everything
  const handleLogout = () => {
    // Retrieve the existing user data from localStorage
    const userAuthData = localStorage.getItem('userAuth');
    let userAuth = userAuthData ? JSON.parse(userAuthData) : {};
  
    // Update only the isLoggedIn flag to false
    userAuth.isLoggedIn = false;
  
    // Save the updated auth data back to localStorage
    localStorage.setItem('userAuth', JSON.stringify(userAuth));
  
    // Update the AuthContext
    setAuth({ isLoggedIn: false, user: userAuth.user });
  
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome {local_user?.first_name}</h1>
      <h4 className='mb-3'>role : {local_user?.role}</h4>
      <table className='mb-3'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            {/*An admin and a super_user can see the email field*/}
            {local_user && ['admin', 'super_user'].includes(local_user.role) && <th>Email</th>}
            {/*Only an admin can see the ip_address*/}
            {local_user && local_user.role === 'admin' && <th>IP Address</th>}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              {/* All other fields are visible to all roles. */}
              <td>{`${user.first_name} ${user.last_name}`}</td>
              {local_user &&  ['admin', 'super_user'].includes(local_user.role) && <td>{user.email}</td>}
              {local_user &&  local_user.role === 'admin' && <td>{user.ip_address}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default UserList;