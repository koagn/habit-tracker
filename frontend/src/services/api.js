import axios from 'axios';

// 👈 1. Create the Axios instance pointing to your LIVE backend
const api = axios.create({
  baseURL: 'https://habit-tracker-x7u0.onrender.com/api', // 👈 The /api is critical here
});

// 👈 2. The Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;