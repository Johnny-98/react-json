// page to list usersauth_user
import { useEffect, useState } from 'react';
import { fetchUsers } from '../authService';
import { User } from '../interfaces';

interface UserListProps {
  userData: any
}

const UserList: React.FC<UserListProps> = ({ userData }) => {
  const [users, setUsers] = useState<User[]>([]);
  
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
            {userData && ['admin', 'super_user'].includes(userData.role) &&<th>Email</th>}
            {/*Only an admin can see the ip_address*/}
            {userData && ['admin'].includes(userData.role) &&<th>IP Address</th>}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              {/* All other fields are visible to all roles. */}
              <td>{`${user.first_name} ${user.last_name}`}</td>
              {userData && ['admin', 'super_user'].includes(userData.role) &&<td>{user.email}</td>}
              {userData && ['admin'].includes(userData.role) &&<td>{user.ip_address}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;