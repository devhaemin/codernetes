import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { LoginRequest, RegisterRequest, LoginResponse } from '@/types';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const username = ref<string | null>(localStorage.getItem('username'));

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await axios.post<LoginResponse>('/api/auth/login', credentials);
      token.value = response.data.token;
      username.value = response.data.username;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      await axios.post('/api/auth/register', userData);
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    token.value = null;
    username.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  const isAuthenticated = (): boolean => {
    return !!token.value;
  };

  return {
    token,
    username,
    login,
    register,
    logout,
    isAuthenticated
  };
}); 