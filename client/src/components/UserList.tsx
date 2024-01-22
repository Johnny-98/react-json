// page to list usersauth_user
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../authService';
import { User } from '../interfaces';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Retrieve user data from localStorage
  // useEffect(() => {
  //   const userAuthData = localStorage.getItem('userAuth');
  //   if (userAuthData) {
  //     try {
  //       const parsedAuthData = JSON.parse(userAuthData);
  //       if (parsedAuthData && parsedAuthData.user) {
  //         setLocalUser(parsedAuthData.user); // Update state
  //       }
  //     } catch (error) {
  //       console.error('Error parsing userAuth data:', error);
  //       setAuth({ isLoggedIn: false, user: null });
  //       navigate('/login');
  //     }
  //   } else {
  //     setAuth({ isLoggedIn: false, user: null });
  //     navigate('/login');
  //   }
  // }, [setAuth, navigate]);
  

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


  return (
    <div>
      <table className='mb-3'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            {/*An admin and a super_user can see the email field*/}
            <th>Email</th>
            {/*Only an admin can see the ip_address*/}
            <th>IP Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              {/* All other fields are visible to all roles. */}
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.email}</td>
              <td>{user.ip_address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;