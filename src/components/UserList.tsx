import React from 'react';
import { getUserList } from '../authService';
import { User } from '../interfaces';

const UserList: React.FC = () => {
  const userList = getUserList();

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {userList.map((user: User) => (
          <li key={user.id}>
            {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
