import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productApi = {
  getDashboardStats: () => api.get('/products/dashboard').then(res => res.data.data),
  getAll: (params) => api.get('/products', { params }).then(res => res.data.data),
  getById: (id) => api.get(`/products/${id}`).then(res => res.data.data),
  create: (data) => api.post('/products', data).then(res => res.data.data),
  update: (id, data) => api.put(`/products/${id}`, data).then(res => res.data.data),
  delete: (id) => api.delete(`/products/${id}`).then(res => res.data.data),
  adjustStock: (id, change_amount, reason) => api.patch(`/products/${id}/stock`, { change_amount, reason }).then(res => res.data.data),
};

export const movementApi = {
  getAll: (params) => api.get('/movements', { params }).then(res => res.data.data),
  getByProduct: (productId) => api.get(`/movements/product/${productId}`).then(res => res.data.data),
};

export default api;
