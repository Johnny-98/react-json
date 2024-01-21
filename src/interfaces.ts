import { Dispatch, SetStateAction } from 'react';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  ip_address?: string;
  gender?: string;
  friends?: Friend[];
  role?: string;
  password? : any;
}
  
export interface Friend {
    id: number;
    name: string;
}

interface AuthUser {
  username: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
}

export interface AuthContextType {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
}
