// page to list users
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, fetchUsers } from '../authService';
import { User } from '../interfaces';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  let auth_user:any;
  
  // Retrieve user data from localStorage
  const userAuthData = localStorage.getItem('userAuth');
  if (userAuthData) {
    try {
      const parsedAuthData = JSON.parse(userAuthData);
      if (parsedAuthData && parsedAuthData.user) {
        auth_user = parsedAuthData.user; // Extract the user data
      }
    } catch (error) {
      console.error('Error parsing userAuth data:', error);
    }
  } else {
    setAuth({ isAuthenticated: false, user: null });
    navigate('/login');
  }

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



  const handleLogout = () => {
    // Remove specific user auth_user data from localStorage
    // If you have other user-specific data in localStorage, remove them as well
    localStorage.removeItem('userAuth');
  
    // Update any application state/context as necessary
    // For example, if you have an authentication context, reset it
    setAuth({ isAuthenticated: false, user: null });
    navigate('/login');
    return <div>Please log in to view this page.</div>;
  };

  return (
    <div>
      <h1>Welcome {auth_user.username}</h1>
      <h4 className='mb-3'>role : {auth_user.role}</h4>
      <table className='mb-3'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            {/*An admin and a super_user can see the email field*/}
            {['admin', 'super_user'].includes(auth_user.role) && <th>Email</th>}
            {/*Only an admin can see the ip_address*/}
            {auth_user.role === 'admin' && <th>IP Address</th>}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              {/* All other fields are visible to all roles. */}
              <td>{`${user.first_name} ${user.last_name}`}</td>
              {['admin', 'super_user'].includes(auth_user.role) && <td>{user.email}</td>}
              {auth_user.role === 'admin' && <td>{user.ip_address}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default UserList;