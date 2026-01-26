import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://uadmin.ubazar.uz/api';

// Create axios instance
const api = axios.create({
  // Ensure baseURL ends with / to avoid path replacement issues
  baseURL: API_URL.endsWith('/') ? API_URL : `${API_URL}/`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
