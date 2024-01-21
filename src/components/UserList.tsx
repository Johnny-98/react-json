// page to list users
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, fetchUsers } from '../authService';
import { User } from '../interfaces';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { auth } = useContext(AuthContext);
  const userAuthCookie = Cookies.get('userAuth');
  let user_cookie;

  if (userAuthCookie) {
    try {
      const parsedCookie = JSON.parse(userAuthCookie);
      if (parsedCookie && parsedCookie.user) {
        user_cookie = parsedCookie.user; // Extract the user data
      }
    } catch (error) {
      console.error('Error parsing userAuth cookie:', error);
      // Handle parsing error (e.g., corrupted cookie data)
    }
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

  // if (!auth.isAuthenticated) {
  //   return <div>Please log in to view this page.</div>;
  // }
  //improve frontend
  return (
    <div>
      <h1>Welcome {user_cookie.username}</h1>
      <h4 className='mb-3'>role : {user_cookie.role}</h4>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            {/*An admin and a super_user can see the email field*/}
            {auth.user && ['admin', 'super_user'].includes(auth.user.role) && <th>Email</th>}
            {/*Only an admin can see the ip_address*/}
            {auth.user && auth.user.role === 'admin' && <th>IP Address</th>}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              {/* All other fields are visible to all roles. */}
              <td>{`${user.first_name} ${user.last_name}`}</td>
              {auth.user && ['admin', 'super_user'].includes(auth.user.role) && <td>{user.email}</td>}
              {auth.user && auth.user.role === 'admin' && <td>{user.ip_address}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;