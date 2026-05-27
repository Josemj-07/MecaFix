export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Product {
  id: number;
  name: string;
  code: string;
  description: string;
  categoryId: number;
  categoryName: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  unit: string;
  active: boolean;
  lowStock: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface InventoryMovement {
  id: number;
  productId: number;
  productName: string;
  productCode: string;
  userName: string;
  type: 'ENTRY' | 'EXIT' | 'ADJUSTMENT';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  createdAt: string;
}

export interface Customer {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
  createdAt?: string;
}

export interface Vehicle {
  id: string | number;
  customerId: string | number;
  customerName: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  color: string;
  mileage?: number;
}

export interface Service {
  id: string | number;
  name: string;
  description: string;
  laborPrice: number;
}

export interface ServiceOrderItem {
  id: number;
  serviceId: number;
  serviceName: string;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface ServiceOrder {
  id: number;
  vehicleId: number;
  vehicleInfo: string;
  customerId: number;
  customerName: string;
  mechanicId: number;
  mechanicName: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'CREATED' | 'FINALIZED' | 'DELIVERED' | 'CANCELED';
  diagnosis: string;
  notes: string;
  totalCost: number;
  items: ServiceOrderItem[];
  createdAt: string;
  completedAt: string;
}

export interface QuoteItem {
  id: number;
  serviceId: number;
  serviceName: string;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Quote {
  id: number;
  vehicleId: number;
  vehicleInfo: string;
  customerId: number;
  customerName: string;
  description: string;
  totalEstimated: number;
  convertedToOrder: boolean;
  serviceOrderId: number;
  status?: string;
  items: QuoteItem[];
  createdAt: string;
  validUntil: string;
}

export interface Payment {
  id: number;
  serviceOrderId: number;
  amount: number;
  method: string;
  reference: string;
  notes: string;
  paidAt: string;
}

export interface DashboardData {
  totalProducts: number;
  lowStockProducts: number;
  totalCustomers: number;
  totalVehicles: number;
  pendingOrders: number;
  inProgressOrders: number;
  completedOrders: number;
  totalRevenue: number;
  totalServices: number;
}
