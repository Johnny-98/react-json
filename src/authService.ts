// src/services/authService.ts

import { User } from './interfaces';
const users = require('./users.json');

export const authenticate = (email: string, password: string): boolean => {
  // Implement authentication logic (e.g., check email and password against users)
  // For simplicity, let's assume the email is the username and the password is not used in this example.
  const user:User | undefined = users.find((u:  User) => u.email === email);
  return !!user;
};

export const getUserList = (): any[] => {
  // Mock API call to get user list
  return users;
};
