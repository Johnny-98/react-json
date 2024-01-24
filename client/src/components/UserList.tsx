// page to list usersauth_user
import { useEffect, useState } from 'react';
import { fetchUsers } from '../authService';
import { User } from '../interfaces';

interface UserListProps {
  userData: User
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
    <div className="data-table rounded mt-5 bg-white p-md-5 chat-body">
        <div className="h2 font-weight-bold"><b>Users</b></div>
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        {userData && ['admin', 'super-user'].includes(userData.role) &&<th scope="col">Email</th>}
                        {userData && ['admin'].includes(userData.role) &&<th scope="col">IP Address</th>}
                        <th scope="col">Frieds</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr>
                      <td valign="middle">{user.id}</td>
                        <td valign="middle">
                            <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="rounded-circle" alt="" />
                            <div className="pl-lg-5 pl-md-3 pl-1 name">{`${user.first_name} ${user.last_name}`}</div>
                        </td>
                        {userData && ['admin', 'super-user'].includes(userData.role) &&<td valign="middle">{user.email}</td>}
                        {userData && ['admin'].includes(userData.role) &&<td valign="middle">{user.ip_address}</td>}
                        <td valign="middle">{user.friends?.length}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default UserList;