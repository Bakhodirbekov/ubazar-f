import api from '../lib/api';

export const favoriteService = {
  // Get user favorites
  getFavorites: async (page: number = 1, per_page: number = 15) => {
    const response = await api.get('/favorites', { params: { page, per_page } });
    return response.data;
  },

  // Add to favorites
  addFavorite: async (carId: number) => {
    const response = await api.post('/favorites', { car_id: carId });
    return response.data;
  },

  // Remove from favorites
  removeFavorite: async (carId: number) => {
    const response = await api.delete(`/favorites/${carId}`);
    return response.data;
  },

  // Check if car is favorite
  checkFavorite: async (carId: number) => {
    const response = await api.get(`/favorites/check/${carId}`);
    return response.data;
  },
};
