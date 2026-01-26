import api from '../lib/api';

export interface Banner {
  id: number;
  title: string;
  image_url: string;
  link?: string;
  description?: string;
  is_active: boolean;
  order: number;
}

export const bannerService = {
  async getBanners(): Promise<Banner[]> {
    try {
      const response = await api.get('/banners');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch banners:', error);
      return [];
    }
  },
};
