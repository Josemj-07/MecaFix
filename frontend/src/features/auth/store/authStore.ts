import { create } from 'zustand';
import type { User } from '../../../domain/models';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (user, token) => {
    localStorage.setItem('mecafix_token', token);
    localStorage.setItem('mecafix_user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('mecafix_token');
    localStorage.removeItem('mecafix_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadFromStorage: () => {
    const token = localStorage.getItem('mecafix_token');
    const userStr = localStorage.getItem('mecafix_user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        set({ user, token, isAuthenticated: true });
      } catch {
        localStorage.removeItem('mecafix_token');
        localStorage.removeItem('mecafix_user');
      }
    }
  },
}));
