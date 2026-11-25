// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/molecules/AuthForm';
import api from '../services/api';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 👈 Used to redirect the user

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError('');
    <AuthForm 
  isLogin={true} 
  onSubmit={handleLogin} 
  isLoading={isLoading} 
  error={error} 
  successMsg={''} // 👈 Add this
/>
    try {
      // 👈 Send POST request to backend
      const response = await api.post('/auth/login', { email, password });
      
      // 👈 Save the token in the browser's local storage
      localStorage.setItem('token', response.data.token);
      
      // 👈 Redirect to Dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <AuthForm isLogin={true} onSubmit={handleLogin} isLoading={isLoading} error={error} />
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default LoginPage;