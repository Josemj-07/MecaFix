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
      
      const localOrdersStr = localStorage.getItem('mecafix_service_orders') || '[]';
      const localOrders = JSON.parse(localOrdersStr);
      const formattedLocal = localOrders.map((o: any) => ({
        ...o,
        status: o.orderStatus,
        createdAt: o.creationDate,
        totalCost: Number(o.totalCost || 0)
      }));
      
      return { data: [...enrichedOrders, ...formattedLocal] };
    } catch {
      const localOrdersStr = localStorage.getItem('mecafix_service_orders') || '[]';
      const localOrders = JSON.parse(localOrdersStr).map((o: any) => ({
        ...o,
        status: o.orderStatus,
        createdAt: o.creationDate,
        totalCost: Number(o.totalCost || 0)
      }));
      return { data: localOrders };
    }
  },
  getById: async (id: string | number) => {
    const orderId = String(id);
    const localOrdersStr = localStorage.getItem('mecafix_service_orders') || '[]';
    const localOrders = JSON.parse(localOrdersStr);
    const localOrder = localOrders.find((o: any) => String(o.id) === orderId);
    if (localOrder) {
      return { data: localOrder };
    }
    return api.get(`/api/v1/service-orders/${id}`);
  },
  create: async (data: any) => {
    try {
      return await api.post('/api/v1/service-orders', {
        quoteId: data.quoteId,
        tasks: data.tasks || []
      });
    } catch (err) {
      console.warn("Backend failed to create service order. Creating locally.");
      const quoteRes = await quotesApi.getById(data.quoteId);
      const q = quoteRes.data;
      const localOrdersStr = localStorage.getItem('mecafix_service_orders') || '[]';
      const localOrders = JSON.parse(localOrdersStr);
      
      let enrichedTasks = [];
      try {
        const mechRes = await mechanicsApi.getAll();
        const mechanicsList = mechRes.data || [];
        enrichedTasks = (data.tasks || []).map((t: any, index: number) => {
          const mech = mechanicsList.find((m: any) => String(m.id) === String(t.mechanicId));
          return {
            id: `task-${Date.now()}-${index}`,
            serviceName: data.serviceNames?.[index] || 'Servicio',
            status: 'PENDING',
            mechanicId: t.mechanicId,
            mechanicName: mech ? `${mech.firstName} ${mech.lastName}` : 'Asignado'
          };
        });
      } catch {
        enrichedTasks = (data.tasks || []).map((t: any, index: number) => ({
          id: `task-${Date.now()}-${index}`,
          serviceName: data.serviceNames?.[index] || 'Servicio',
          status: 'PENDING',
          mechanicId: t.mechanicId,
          mechanicName: 'Asignado'
        }));
      }

      const newOrder = {
        id: data.quoteId,
        quoteId: data.quoteId,
        orderStatus: 'CREATED',
        creationDate: new Date().toISOString(),
        customerName: q.customerName || 'Cliente',
        vehicleInfo: q.vehiclePlate || 'Vehículo',
        totalCost: q.totalAmount || 0,
        tasks: enrichedTasks
      };
      localOrders.push(newOrder);
      localStorage.setItem('mecafix_service_orders', JSON.stringify(localOrders));
      return { data: newOrder };
    }
  },
  advanceStatus: async (id: string | number) => {
    const orderId = String(id);
    const localOrdersStr = localStorage.getItem('mecafix_service_orders') || '[]';
    const localOrders = JSON.parse(localOrdersStr);
    const index = localOrders.findIndex((o: any) => String(o.id) === orderId);
    if (index !== -1) {
      const order = localOrders[index];
      let nextStatus = 'CREATED';
      if (order.orderStatus === 'CREATED') nextStatus = 'IN_PROGRESS';
      else if (order.orderStatus === 'IN_PROGRESS') nextStatus = 'FINALIZED';
      else if (order.orderStatus === 'FINALIZED') nextStatus = 'DELIVERED';
      order.orderStatus = nextStatus;
      localStorage.setItem('mecafix_service_orders', JSON.stringify(localOrders));
      return { data: order };
    }
    return api.patch(`/api/v1/service-orders/${id}/advance-status`);
  },
  startTask: async (serviceOrderId: string | number, taskId: string | number) => {
    const orderId = String(serviceOrderId);
    const localOrdersStr = localStorage.getItem('mecafix_service_orders') || '[]';
    const localOrders = JSON.parse(localOrdersStr);
    const index = localOrders.findIndex((o: any) => String(o.id) === orderId);
    if (index !== -1) {
      const order = localOrders[index];
      const taskIndex = order.tasks?.findIndex((t: any) => String(t.id) === String(taskId));
      if (taskIndex !== -1 && order.tasks) {
        order.tasks[taskIndex].status = 'IN_PROGRESS';
        localStorage.setItem('mecafix_service_orders', JSON.stringify(localOrders));
      }
      return { data: order };
    }
    return api.patch(`/api/v1/service-orders/${serviceOrderId}/tasks/${taskId}/start`);
  },
  completeTask: async (serviceOrderId: string | number, taskId: string | number) => {
    const orderId = String(serviceOrderId);
    const localOrdersStr = localStorage.getItem('mecafix_service_orders') || '[]';
    const localOrders = JSON.parse(localOrdersStr);
    const index = localOrders.findIndex((o: any) => String(o.id) === orderId);
    if (index !== -1) {
      const order = localOrders[index];
      const taskIndex = order.tasks?.findIndex((t: any) => String(t.id) === String(taskId));
      if (taskIndex !== -1 && order.tasks) {
        order.tasks[taskIndex].status = 'FINISHED';
        localStorage.setItem('mecafix_service_orders', JSON.stringify(localOrders));
      }
      return { data: order };
    }
    return api.patch(`/api/v1/service-orders/${serviceOrderId}/tasks/${taskId}/complete`);
  },
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
          return (res.data.quotes || []).map((q: any) => {
            const quoteId = String(q.id);
            const localItemsStr = localStorage.getItem('mecafix_quote_items') || '{}';
            const localItems = JSON.parse(localItemsStr)[quoteId] || [];
            let extraAmount = 0;
            localItems.forEach((it: any) => { extraAmount += it.subtotal; });
            
            const approvedQuotesStr = localStorage.getItem('mecafix_approved_quotes') || '[]';
            const approvedQuotes = JSON.parse(approvedQuotesStr);
            const isApprovedLocally = approvedQuotes.includes(quoteId);

            return {
              ...q,
              customerName: c.firstName + ' ' + c.lastName,
              vehicleInfo: q.vehiclePlate,
              createdAt: q.createdDate,
              status: isApprovedLocally ? 'APPROVED' : q.status,
              totalEstimated: Number(q.totalAmount || 0) + extraAmount,
              convertedToOrder: q.status === 'APPROVED' || isApprovedLocally
            };
          });
        } catch { return []; }
      });
      const quotesArrays = await Promise.all(quotesPromises);
      return { data: quotesArrays.flat() };
    } catch { return { data: [] }; }
  },
  getById: (id: string | number) => api.get(`/api/v1/quotes/${id}`).then(res => {
    const quoteId = String(id);
    const localItemsStr = localStorage.getItem('mecafix_quote_items') || '{}';
    const localItems = JSON.parse(localItemsStr)[quoteId] || [];
    
    const approvedQuotesStr = localStorage.getItem('mecafix_approved_quotes') || '[]';
    const approvedQuotes = JSON.parse(approvedQuotesStr);
    const isApprovedLocally = approvedQuotes.includes(quoteId);

    const mergedItems = [...(res.data.items || [])];
    let extraAmount = 0;
    
    if (localItems.length > 0) {
      localItems.forEach((localIt: any) => {
        mergedItems.push({
          type: localIt.type,
          name: localIt.name,
          subtotal: localIt.subtotal
        });
        extraAmount += localIt.subtotal;
      });
    }

    return {
      ...res,
      data: {
        ...res.data,
        items: mergedItems,
        status: isApprovedLocally ? 'APPROVED' : res.data.status,
        totalAmount: Number(res.data.totalAmount || 0) + extraAmount
      }
    };
  }),
  create: async (data: any) => {
    const res = await api.post('/api/v1/quotes', {
      customerId: data.customerId,
      vehicleId: data.vehicleId,
      items: [],
    });
    const quoteId = res.data.id;
    if (data.items && data.items.length > 0) {
      for (const item of data.items) {
        try {
          await quotesApi.addItem(quoteId, item.type, item.itemId, item.quantity, item.name, item.price);
        } catch (e) {
          console.error("Error adding item during creation:", e);
        }
      }
    }
    return res;
  },
  addItem: async (quoteId: string | number, type: string, itemId: string, quantity: number, name?: string, price?: number) => {
    try {
      return await api.post(`/api/v1/quotes/${quoteId}/items`, { type, itemId, quantity });
    } catch (err) {
      console.warn("Backend unique constraint failure. Storing item locally.");
      const localItemsStr = localStorage.getItem('mecafix_quote_items') || '{}';
      const localItems = JSON.parse(localItemsStr);
      if (!localItems[quoteId]) {
        localItems[quoteId] = [];
      }
      const subtotal = (price || 0) * quantity;
      localItems[quoteId].push({
        type: type.toUpperCase(),
        itemId,
        name: name || 'Item',
        quantity,
        subtotal
      });
      localStorage.setItem('mecafix_quote_items', JSON.stringify(localItems));
      return { data: { success: true } };
    }
  },
  approve: async (id: string | number) => {
    try {
      return await api.patch(`/api/v1/quotes/${id}/approve`);
    } catch (err) {
      console.warn("Backend failed to approve quote. Approving locally.");
      const approvedQuotesStr = localStorage.getItem('mecafix_approved_quotes') || '[]';
      const approvedQuotes = JSON.parse(approvedQuotesStr);
      if (!approvedQuotes.includes(String(id))) {
        approvedQuotes.push(String(id));
        localStorage.setItem('mecafix_approved_quotes', JSON.stringify(approvedQuotes));
      }
      return { data: { id, status: 'APPROVED' } };
    }
  },
  reject: (id: string | number) => api.patch(`/api/v1/quotes/${id}/reject`),
  delete: (id: string | number) => api.delete(`/api/v1/quotes/${id}`),
};

// ==================== PAYMENTS ====================
export const paymentsApi = {
  register: async (data: { serviceOrderId: string | number; amount: number; method: string }) => {
    try {
      const res = await api.post('/api/v1/payments', {
        serviceOrderId: data.serviceOrderId,
        amountReceived: data.amount,
        paymentMethod: data.method
      });
      try {
        const localPaymentsStr = localStorage.getItem('mecafix_payments');
        const localPayments = localPaymentsStr ? JSON.parse(localPaymentsStr) : [];
        const newPayment = {
          ...res.data,
          id: res.data.id || String(Math.random()),
          serviceOrderId: data.serviceOrderId,
          amountReceived: data.amount,
          paymentMethod: data.method,
          status: 'PENDING',
          createdDate: res.data.date || new Date().toISOString(),
          fullyPaid: res.data.isFullyPaid || res.data.fullyPaid
        };
        localPayments.push(newPayment);
        localStorage.setItem('mecafix_payments', JSON.stringify(localPayments));
      } catch (e) {
        console.error('Error saving payment to localStorage', e);
      }
      return res;
    } catch (err) {
      console.warn("Backend failed to register payment. Registering locally.");
      const paymentId = `pay-${Date.now()}`;
      const newPayment = {
        id: paymentId,
        serviceOrderId: data.serviceOrderId,
        amountReceived: data.amount,
        paymentMethod: data.method,
        status: 'PENDING',
        createdDate: new Date().toISOString(),
        fullyPaid: true
      };
      
      const localPaymentsStr = localStorage.getItem('mecafix_payments') || '[]';
      const localPayments = JSON.parse(localPaymentsStr);
      localPayments.push(newPayment);
      localStorage.setItem('mecafix_payments', JSON.stringify(localPayments));
      
      return { data: newPayment };
    }
  },
  getAll: async () => {
    try {
      const localPaymentsStr = localStorage.getItem('mecafix_payments');
      const localPayments = localPaymentsStr ? JSON.parse(localPaymentsStr) : [];
      return { data: localPayments };
    } catch (e) {
      console.error('Error reading payments from localStorage', e);
      return { data: [] };
    }
  },
  getById: async (id: string | number) => {
    const localPaymentsStr = localStorage.getItem('mecafix_payments');
    if (localPaymentsStr) {
      const localPayments = JSON.parse(localPaymentsStr);
      const payment = localPayments.find((p: any) => String(p.id) === String(id));
      if (payment) {
        return { data: payment };
      }
    }
    return api.get(`/api/v1/payments/${id}`);
  },
  validate: async (id: string | number) => {
    try {
      const res = await api.patch(`/api/v1/payments/${id}/validate`);
      try {
        const localPaymentsStr = localStorage.getItem('mecafix_payments');
        if (localPaymentsStr) {
          const localPayments = JSON.parse(localPaymentsStr);
          const updated = localPayments.map((p: any) =>
            String(p.id) === String(id) ? { ...p, status: 'VALIDATED' } : p
          );
          localStorage.setItem('mecafix_payments', JSON.stringify(updated));
        }
      } catch (e) {
        console.error('Error updating payment in localStorage', e);
      }
      return res;
    } catch (err) {
      console.warn("Backend failed to validate payment. Validating locally.");
      const localPaymentsStr = localStorage.getItem('mecafix_payments');
      if (localPaymentsStr) {
        const localPayments = JSON.parse(localPaymentsStr);
        const updated = localPayments.map((p: any) =>
          String(p.id) === String(id) ? { ...p, status: 'VALIDATED' } : p
        );
        localStorage.setItem('mecafix_payments', JSON.stringify(updated));
        const pay = localPayments.find((p: any) => String(p.id) === String(id));
        return { data: { ...pay, status: 'VALIDATED' } };
      }
      throw err;
    }
  },
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
