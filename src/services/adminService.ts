import api from '../lib/api';

export const adminService = {
  // Dashboard
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },

  // Cars
  getCars: async (params: any = {}) => {
    const response = await api.get('/admin/cars', { params });
    return response.data;
  },

  getPendingCars: async (params: any = {}) => {
    const response = await api.get('/admin/cars/pending', { params });
    return response.data;
  },

  approveCar: async (id: number, timerDuration?: number) => {
    const response = await api.post(`/admin/cars/${id}/approve`, { timer_duration: timerDuration });
    return response.data;
  },

  rejectCar: async (id: number, reason?: string) => {
    const response = await api.post(`/admin/cars/${id}/reject`, { reason });
    return response.data;
  },

  toggleHotDeal: async (id: number) => {
    const response = await api.post(`/admin/cars/${id}/toggle-hot-deal`);
    return response.data;
  },

  startTimer: async (id: number, hours?: number) => {
    const response = await api.post(`/admin/cars/${id}/start-timer`, { hours });
    return response.data;
  },

  expireTimer: async (id: number) => {
    const response = await api.post(`/admin/cars/${id}/expire-timer`);
    return response.data;
  },

  // Users
  getUsers: async (params: any = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  blockUser: async (id: number) => {
    const response = await api.post(`/admin/users/${id}/block`);
    return response.data;
  },

  unblockUser: async (id: number) => {
    const response = await api.post(`/admin/users/${id}/unblock`);
    return response.data;
  },

  updateUserRole: async (id: number, role: string) => {
    const response = await api.put(`/admin/users/${id}/role`, { role });
    return response.data;
  },

  // Categories
  getCategories: async () => {
    const response = await api.get('/admin/categories');
    return response.data;
  },

  createCategory: async (data: any) => {
    const response = await api.post('/admin/categories', data);
    return response.data;
  },

  updateCategory: async (id: number, data: any) => {
    const response = await api.put(`/admin/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: number) => {
    const response = await api.delete(`/admin/categories/${id}`);
    return response.data;
  },

  // Complaints
  getComplaints: async (params: any = {}) => {
    const response = await api.get('/admin/complaints', { params });
    return response.data;
  },

  resolveComplaint: async (id: number, adminResponse: string) => {
    const response = await api.post(`/admin/complaints/${id}/resolve`, { admin_response: adminResponse });
    return response.data;
  },

  rejectComplaint: async (id: number, adminResponse: string) => {
    const response = await api.post(`/admin/complaints/${id}/reject`, { admin_response: adminResponse });
    return response.data;
  },

  // Settings
  getSettings: async () => {
    const response = await api.get('/admin/settings');
    return response.data;
  },

  updateSettings: async (settings: any[]) => {
    const response = await api.put('/admin/settings', { settings });
    return response.data;
  },
};
