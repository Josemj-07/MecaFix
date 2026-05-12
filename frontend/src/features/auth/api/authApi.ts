import api from '../../../config/axios';
import type { AuthResponse } from '../../../domain/models';

export const authApi = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),

  register: (data: { firstName: string; lastName: string; email: string; password: string; role?: string }) =>
    api.post<AuthResponse>('/auth/register', data),

  me: () => api.get<AuthResponse>('/auth/me'),
};
