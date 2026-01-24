import api from '../lib/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  message: string;
  user: any;
  access_token: string;
  token_type: string;
}

export const authService = {
  // User registration
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/register', data);
    return response.data;
  },

  // User login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  // Admin login
  adminLogin: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/admin/login', credentials);
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await api.post('/logout');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  // Get current user
  me: async () => {
    const response = await api.get('/me');
    return response.data.user;
  },

  // Update profile
  updateProfile: async (data: any) => {
    const response = await api.put('/profile', data);
    return response.data;
  },

  // Change password
  changePassword: async (data: any) => {
    const response = await api.post('/change-password', data);
    return response.data;
  },
};
