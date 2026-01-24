import api from '../lib/api';

export interface CarFilters {
  page?: number;
  per_page?: number;
  category_id?: number;
  subcategory_id?: number;
  search?: string;
  min_price?: number;
  max_price?: number;
  year?: number;
  fuel_type?: string;
  transmission?: string;
  hot_deals?: boolean;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export const carService = {
  // Get all cars with filters
  getCars: async (filters: CarFilters = {}) => {
    const response = await api.get('/cars', { params: filters });
    return response.data;
  },

  // Get single car
  getCar: async (id: number) => {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  },

  // Get hot deals
  getHotDeals: async (page: number = 1, per_page: number = 15) => {
    const response = await api.get('/cars/hot-deals', { params: { page, per_page } });
    return response.data;
  },

  // Create car listing
  createCar: async (formData: FormData) => {
    const response = await api.post('/cars', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update car
  updateCar: async (id: number, data: any) => {
    const response = await api.put(`/cars/${id}`, data);
    return response.data;
  },

  // Delete car
  deleteCar: async (id: number) => {
    const response = await api.delete(`/cars/${id}`);
    return response.data;
  },

  // Get my cars
  getMyCars: async (page: number = 1, per_page: number = 15) => {
    const response = await api.get('/my-cars', { params: { page, per_page } });
    return response.data;
  },
};
