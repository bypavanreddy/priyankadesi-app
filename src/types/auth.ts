export type UserRole = 'admin' | 'supervisor' | 'marketing' | 'farmer';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface AuthState {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}