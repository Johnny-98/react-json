
export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
    friends: Friend[];
}
  
export interface Friend {
    id: number;
    name: string;
}