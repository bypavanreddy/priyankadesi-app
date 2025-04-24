import { create } from 'zustand';
import type { AuthState, UserRole } from '../types/auth';

// Dummy user data for demonstration
const getDummyUser = (role: UserRole) => ({
  id: '1',
  name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
  role,
  email: `demo.${role}@priyankafoods.com`,
});

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (role: UserRole) => set({ user: getDummyUser(role) }),
  logout: () => set({ user: null }),
}));