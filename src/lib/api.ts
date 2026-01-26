import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://uadmin.ubazar.uz/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL.endsWith('/') ? API_URL : `${API_URL}/`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add token and fix URL joining
api.interceptors.request.use(
  (config) => {
    // If the URL starts with a slash, we remove it to ensure it appends to the baseURL's path
    // e.g. baseURL: '.../api/' + url: 'cars' -> '.../api/cars'
    if (config.url?.startsWith('/')) {
      config.url = config.url.substring(1);
    }

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
