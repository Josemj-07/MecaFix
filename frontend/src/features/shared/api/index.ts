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
  getAll: async () => {
    const custRes = await customersApi.getAll();
    const customers = custRes.data || [];
    const vehiclesPromises = customers.map((c: any) => 
      api.get(`/api/v1/customers/${c.id}/vehicles`).then(r => (r.data.vehicles || []).map((v: any) => ({ ...v, year: v.manufacturingYear, customerId: c.id, customerName: `${c.firstName} ${c.lastName}` })))
    );
    const vehiclesArrays = await Promise.all(vehiclesPromises);
    return { data: vehiclesArrays.flat() };
  },
  getById: (id: string | number) => api.get<Vehicle>(`/api/v1/vehicles/${id}`), // Optional endpoint
  getByCustomer: (customerId: string | number) => api.get(`/api/v1/customers/${customerId}/vehicles`).then(r => ({ ...r, data: (r.data.vehicles || []).map((v:any) => ({...v, year: v.manufacturingYear, customerId: customerId}))})),
  create: (data: any) => api.post<Vehicle>('/api/v1/vehicles', {
    customerId: data.customerId,
    plate: data.plate,
    brand: data.brand,
    model: data.model,
    manufacturingYear: data.year,
    mileage: data.mileage || 0,
    color: data.color
  }),
  update: (id: string | number, data: any) => api.patch<Vehicle>(`/api/v1/vehicles/${id}`, {
    mileage: data.mileage || 0,
    color: data.color
  }),
  delete: (id: string | number) => api.delete(`/api/v1/vehicles/${id}`),
};

export const servicesApi = {
  getAll: () => api.get('/api/v1/services').then(res => ({ ...res, data: res.data.services })),
  getById: (id: string | number) => api.get<Service>(`/api/v1/services/${id}`),
  create: (data: Partial<Service>) => api.post<Service>('/api/v1/services', {
    name: data.name,
    description: data.description,
    laborPrice: data.laborPrice
  }),
  update: (id: string | number, data: Partial<Service>) => api.patch<Service>(`/api/v1/services/${id}`, {
    description: data.description,
    laborPrice: data.laborPrice
  }),
  delete: (id: string | number) => api.delete(`/api/v1/services/${id}`),
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
