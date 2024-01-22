// authService.ts
import axios from 'axios';
import { createContext } from 'react';
import { AuthContextType, AuthState, User } from './interfaces';

//fetch the data 
export const fetchUsers = async (): Promise<User[]> => {
  try {
    // Making a mock call using axios http lib to get the json.(improve)
    const response = await axios.get<User[]>('users.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
