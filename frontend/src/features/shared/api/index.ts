import api from '../../../config/axios';
import type { Customer, Vehicle, Service, ServiceOrder, Quote, Payment, DashboardData } from '../../../domain/models';

export const customersApi = {
  getAll: () => api.get('/api/v1/customers').then(res => ({ ...res, data: res.data.customers.map((c: any) => ({ ...c, phone: c.mobilePhone })) })),
  getById: (id: string | number) => api.get(`/api/v1/customers/${id}`).then(res => ({ ...res, data: { ...res.data, phone: res.data.mobilePhone, dni: res.data.dni } })),
  create: (data: Partial<Customer>) => api.post<Customer>('/api/v1/customers', {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    mobilePhone: data.phone,
    nationalId: data.dni
  }),
  update: (id: string | number, data: Partial<Customer>) => api.patch<Customer>(`/api/v1/customers/${id}`, {
    email: data.email,
    mobilePhone: data.phone,
    nationalId: data.dni
  }),
  delete: (id: string | number) => api.delete(`/api/v1/customers/${id}`),
};

export const vehiclesApi = {
  getAll: () => api.get<Vehicle[]>('/vehicles'),
  getById: (id: number) => api.get<Vehicle>(`/vehicles/${id}`),
  getByCustomer: (customerId: number) => api.get<Vehicle[]>(`/vehicles/customer/${customerId}`),
  create: (data: Partial<Vehicle>) => api.post<Vehicle>('/vehicles', data),
  update: (id: number, data: Partial<Vehicle>) => api.put<Vehicle>(`/vehicles/${id}`, data),
  delete: (id: number) => api.delete(`/vehicles/${id}`),
};

export const servicesApi = {
  getAll: () => api.get<Service[]>('/services'),
  getById: (id: number) => api.get<Service>(`/services/${id}`),
  create: (data: Partial<Service>) => api.post<Service>('/services', data),
  update: (id: number, data: Partial<Service>) => api.put<Service>(`/services/${id}`, data),
  delete: (id: number) => api.delete(`/services/${id}`),
};

export const ordersApi = {
  getAll: () => api.get<ServiceOrder[]>('/service-orders'),
  getById: (id: number) => api.get<ServiceOrder>(`/service-orders/${id}`),
  create: (data: unknown) => api.post<ServiceOrder>('/service-orders', data),
  updateStatus: (id: number, status: string) => api.patch<ServiceOrder>(`/service-orders/${id}/status`, { status }),
  delete: (id: number) => api.delete(`/service-orders/${id}`),
};

export const quotesApi = {
  getAll: () => api.get<Quote[]>('/quotes'),
  getById: (id: number) => api.get<Quote>(`/quotes/${id}`),
  create: (data: unknown) => api.post<Quote>('/quotes', data),
  convert: (id: number) => api.post<ServiceOrder>(`/quotes/${id}/convert`),
  delete: (id: number) => api.delete(`/quotes/${id}`),
};

export const paymentsApi = {
  getAll: () => api.get<Payment[]>('/payments'),
  getByOrder: (orderId: number) => api.get<Payment[]>(`/payments/order/${orderId}`),
  create: (data: Partial<Payment>) => api.post<Payment>('/payments', data),
};

export const reportsApi = {
  getDashboard: () => api.get<DashboardData>('/reports/dashboard'),
};
