import api from '../../../config/axios';
import type { Customer, Vehicle, Service, ServiceOrder, Quote, Payment } from '../../../domain/models';

// ==================== CUSTOMERS ====================
export const customersApi = {
  getAll: () => api.get('/api/v1/customers').then(res => ({
    ...res,
    data: (res.data.customers || []).map((c: any) => ({ ...c, phone: c.mobilePhone }))
  })),
  getById: (id: string | number) => api.get(`/api/v1/customers/${id}`).then(res => ({
    ...res,
    data: { ...res.data, phone: res.data.mobilePhone, dni: res.data.nationalId }
  })),
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
};

// ==================== VEHICLES ====================
export const vehiclesApi = {
  getAll: async () => {
    const custRes = await customersApi.getAll();
    const customers = custRes.data || [];
    const vehiclesPromises = customers.map((c: any) =>
      api.get(`/api/v1/customers/${c.id}/vehicles`).then(r =>
        (r.data.vehicles || []).map((v: any) => ({
          ...v, year: v.manufacturingYear, customerId: c.id,
          customerName: `${c.firstName} ${c.lastName}`
        }))
      )
    );
    const vehiclesArrays = await Promise.all(vehiclesPromises);
    return { data: vehiclesArrays.flat() };
  },
  getByCustomer: (customerId: string | number) =>
    api.get(`/api/v1/customers/${customerId}/vehicles`).then(r => ({
      ...r,
      data: (r.data.vehicles || []).map((v: any) => ({
        ...v, year: v.manufacturingYear, customerId
      }))
    })),
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
};

// ==================== SERVICES ====================
export const servicesApi = {
  getAll: () => api.get('/api/v1/services').then(res => ({ ...res, data: res.data.services || [] })),
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
};

// ==================== SERVICE ORDERS ====================
export const ordersApi = {
  getAll: async () => {
    try {
      const ordersRes = await api.get('/api/v1/service-orders');
      const orders = ordersRes.data.serviceOrders || [];

      const enrichedOrdersPromises = orders.map(async (o: any) => {
        try {
          const quoteRes = await api.get(`/api/v1/quotes/${o.quoteId}`);
          const q = quoteRes.data;
          return {
            ...o,
            status: o.orderStatus,
            createdAt: o.creationDate,
            customerName: q.customerName,
            vehicleInfo: q.vehiclePlate,
            totalCost: q.totalAmount,
          };
        } catch {
          return {
            ...o, status: o.orderStatus, createdAt: o.creationDate,
            customerName: 'Desconocido', vehicleInfo: 'Desconocido', totalCost: 0
          };
        }
      });
      const enrichedOrders = await Promise.all(enrichedOrdersPromises);
      return { data: enrichedOrders };
    } catch {
      return { data: [] };
    }
  },
  getById: (id: string | number) => api.get(`/api/v1/service-orders/${id}`),
  create: (data: any) => api.post('/api/v1/service-orders', { quoteId: data.quoteId }),
  advanceStatus: (id: string | number) => api.patch(`/api/v1/service-orders/${id}/advance-status`),
  startTask: (serviceOrderId: string | number, taskId: string | number) =>
    api.patch(`/api/v1/service-orders/${serviceOrderId}/tasks/${taskId}/start`),
  completeTask: (serviceOrderId: string | number, taskId: string | number) =>
    api.patch(`/api/v1/service-orders/${serviceOrderId}/tasks/${taskId}/complete`),
};

// ==================== QUOTES ====================
export const quotesApi = {
  getAll: async () => {
    try {
      const custRes = await customersApi.getAll();
      const customers = custRes.data || [];
      const quotesPromises = customers.map(async (c: any) => {
        try {
          const res = await api.get(`/api/v1/quotes/customer/${c.id}`);
          return (res.data.quotes || []).map((q: any) => ({
            ...q,
            customerName: c.firstName + ' ' + c.lastName,
            vehicleInfo: q.vehiclePlate,
            createdAt: q.createdDate,
            totalEstimated: q.totalAmount,
            convertedToOrder: q.status === 'APPROVED'
          }));
        } catch { return []; }
      });
      const quotesArrays = await Promise.all(quotesPromises);
      return { data: quotesArrays.flat() };
    } catch { return { data: [] }; }
  },
  getById: (id: string | number) => api.get(`/api/v1/quotes/${id}`),
  create: (data: any) => api.post('/api/v1/quotes', {
    customerId: data.customerId,
    vehicleId: data.vehicleId,
    items: data.items || [],
  }),
  addItem: (quoteId: string | number, type: string, itemId: string, quantity: number) =>
    api.post(`/api/v1/quotes/${quoteId}/items`, { type, itemId, quantity }),
  approve: (id: string | number) => api.patch(`/api/v1/quotes/${id}/approve`),
  reject: (id: string | number) => api.patch(`/api/v1/quotes/${id}/reject`),
  delete: (id: string | number) => api.delete(`/api/v1/quotes/${id}`),
};

// ==================== PAYMENTS ====================
export const paymentsApi = {
  register: (data: { serviceOrderId: string | number; amount: number; method: string }) =>
    api.post('/api/v1/payments', {
      serviceOrderId: data.serviceOrderId,
      amountReceived: data.amount,
      paymentMethod: data.method
    }),
  getAll: () => api.get('/api/v1/payments').then(res => ({
    ...res,
    data: res.data.payments || []
  })),
  getById: (id: string | number) => api.get(`/api/v1/payments/${id}`),
  validate: (id: string | number) => api.patch(`/api/v1/payments/${id}/validate`),
};

// ==================== MECHANICS ====================
export const mechanicsApi = {
  getAll: () => api.get('/api/v1/mechanics').then(res => ({ ...res, data: res.data.mechanics || [] })),
  getById: (id: string | number) => api.get(`/api/v1/mechanics/${id}`),
  create: (data: { firstName: string; lastName: string; email: string; phone: string; dni: string; specialty: string }) =>
    api.post('/api/v1/mechanics', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobilePhone: data.phone,
      nationalId: data.dni,
      specialty: data.specialty
    }),
  getBySpecialty: (specialty: string) =>
    api.get(`/api/v1/mechanics/specialty/${specialty}`).then(res => ({
      ...res, data: res.data.mechanics || []
    })),
};
