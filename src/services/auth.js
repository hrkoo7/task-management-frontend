import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
});

export const authService = {
  async login(email, password) {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  async register(email, password) {
    const response = await api.post('/api/auth/register', { email, password });
    return response.data;
  },

  async logout() {
    await api.post('/api/auth/logout');
  }
};