export interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  email: string;
  ip_address?: string;
  gender?: string;
  friends?: Friend[];
  role?: string;
  password : any;
}
  
export interface Friend {
    id: number;
    name: string;
}
