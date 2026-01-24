import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

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
      const response = await axios.get(`${API_BASE}/banners`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch banners:', error);
      return [];
    }
  },
};
