import api from '../../../config/axios';
import type { Product, Category } from '../../../domain/models';

export const inventoryApi = {
  // Products — aligned with ProductController endpoints
  getProducts: () => api.get('/api/v1/products').then(r => ({ ...r, data: r.data.products || r.data })),
  getProduct: (id: string | number) => api.get<Product>(`/api/v1/products/${id}`),
  createProduct: (data: Partial<Product>) => api.post<Product>('/api/v1/products', {
    name: data.name,
    description: data.description,
    categoryId: data.categoryId,
    purchasePrice: data.purchasePrice,
    salePrice: data.salePrice,
    stock: data.stock,
  }),
  updateProductPrice: (id: string | number, purchasePrice: number, salePrice: number) =>
    api.patch(`/api/v1/products/${id}/price`, { purchasePrice, salePrice }),
  updateProductStock: (id: string | number, quantity: number, operation: string) =>
    api.patch(`/api/v1/products/${id}/stock`, { quantity, operation }),

  // Categories — aligned with CategoryController endpoints (only POST and GET)
  getCategories: () => api.get('/api/v1/categories').then(r => ({ ...r, data: r.data.categories || r.data })),
  getCategory: (id: string | number) => api.get<Category>(`/api/v1/categories/${id}`),
  createCategory: (data: Partial<Category>) => api.post<Category>('/api/v1/categories', {
    name: data.name,
  }),
};
