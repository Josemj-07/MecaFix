import Axios, { type InternalAxiosRequestConfig } from 'axios';

import { useNotifications } from '@/components/ui/notifications';
import { env } from '@/config/env';

// Single, preconfigured API client for the whole application.
// The response interceptor unwraps `response.data`, so request functions
// return the payload directly.

function requestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers.Accept = 'application/json';
  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message: string =
      error.response?.data?.message ||
      error.message ||
      'Ocurrió un error inesperado. Inténtalo de nuevo.';

    useNotifications.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  },
);
