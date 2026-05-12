import api from '../../../config/axios';
import type { Product, Category, InventoryMovement } from '../../../domain/models';

export const inventoryApi = {
  // Products
  getProducts: () => api.get<Product[]>('/products'),
  getProduct: (id: number) => api.get<Product>(`/products/${id}`),
  getLowStock: () => api.get<Product[]>('/products/low-stock'),
  searchProducts: (q: string) => api.get<Product[]>(`/products/search?q=${q}`),
  createProduct: (data: Partial<Product>) => api.post<Product>('/products', data),
  updateProduct: (id: number, data: Partial<Product>) => api.put<Product>(`/products/${id}`, data),
  deleteProduct: (id: number) => api.delete(`/products/${id}`),

  // Categories
  getCategories: () => api.get<Category[]>('/categories'),
  createCategory: (data: Partial<Category>) => api.post<Category>('/categories', data),
  updateCategory: (id: number, data: Partial<Category>) => api.put<Category>(`/categories/${id}`, data),
  deleteCategory: (id: number) => api.delete(`/categories/${id}`),

  // Movements
  getMovements: () => api.get<InventoryMovement[]>('/inventory/movements'),
  getProductMovements: (productId: number) => api.get<InventoryMovement[]>(`/inventory/movements/product/${productId}`),
  createMovement: (data: { productId: number; type: string; quantity: number; reason?: string }) =>
    api.post<InventoryMovement>('/inventory/movements', data),
};
