// page to list users
import { useContext, useEffect, useState } from 'react';
import { AuthContext, fetchUsers } from '../authService';
import { User } from '../interfaces';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { auth } = useContext(AuthContext);

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

  if (!auth.isAuthenticated) {
    return <div>Please log in to view this page.</div>;
  }
  //improve frontend
  return (
    <div>
      <h1>User List</h1>
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