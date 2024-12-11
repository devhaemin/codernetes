import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { ElMessage } from 'element-plus';
import router from '@/router';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          const authStore = useAuthStore();
          authStore.logout();
          router.push('/login');
          ElMessage.error('Session expired. Please login again.');
          break;
        case 403:
          ElMessage.error('Access denied');
          break;
        case 404:
          ElMessage.error('Resource not found');
          break;
        default:
          ElMessage.error('An error occurred');
      }
    }
    return Promise.reject(error);
  }
);

export default api; 