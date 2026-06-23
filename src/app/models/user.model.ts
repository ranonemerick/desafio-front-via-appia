export interface User {
  id?: string;
  name: string;
  login: string;
  password?: string;
  active?: boolean; 
  email: string;
  role: 'ADMIN' | 'USER' | string; 
}