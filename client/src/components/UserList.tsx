// page to list usersauth_user
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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
    <div className="data-table rounded mt-5 bg-white p-md-5 chat-body">
        <div className="h2 font-weight-bold"><b>Users</b></div>
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">IP</th>
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