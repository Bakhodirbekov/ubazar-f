import api from '../lib/api';

export const notificationService = {
  // Get notifications
  getNotifications: async (page: number = 1, per_page: number = 20) => {
    const response = await api.get('/notifications', { params: { page, per_page } });
    return response.data;
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread-count');
    return response.data;
  },

  // Mark as read
  markAsRead: async (id: number) => {
    const response = await api.post(`/notifications/${id}/read`);
    return response.data;
  },

  // Mark all as read
  markAllAsRead: async () => {
    const response = await api.post('/notifications/read-all');
    return response.data;
  },
};
