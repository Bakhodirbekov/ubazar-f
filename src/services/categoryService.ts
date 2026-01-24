import api from '../lib/api';

export const categoryService = {
  // Get all categories with subcategories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get single category
  getCategory: async (id: number) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
};
