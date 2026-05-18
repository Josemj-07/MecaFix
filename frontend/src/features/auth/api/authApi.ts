import api from '../../../config/axios';
import type { AuthResponse } from '../../../domain/models';

export const authApi = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),

  register: (data: { firstName: string; lastName: string; email: string; password: string; role?: string }) =>
    api.post('/auth/register', {
      email: data.email,
      password: data.password,
      name: `${data.firstName} ${data.lastName}`.trim(),
      role: data.role || 'ADMINISTRATOR'
    }),

  me: () => api.get<AuthResponse>('/auth/me'),
};
