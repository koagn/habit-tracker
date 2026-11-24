import axios from 'axios';

// 👈 1. Create the Axios instance pointing to your backend
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // All requests will start with this
});

// 👈 2. The Interceptor (The Magic Mechanic)
// This runs automatically BEFORE every single request you make
api.interceptors.request.use((config) => {
  // Look in the browser's local storage for the token
  const token = localStorage.getItem('token');
  
  // If the token exists, attach it to the headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;