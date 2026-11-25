// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/molecules/AuthForm';
import api from '../services/api';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (email, password) => {
    // Basic client-side validation
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    setIsLoading(true);
    setError('');
    setSuccessMsg('');
    
    try {
      // Send POST request to backend
      const response = await api.post('/auth/register', { email, password });
      
      // Save token
      localStorage.setItem('token', response.data.token);
      
      // Show success message
      setSuccessMsg('Account created successfully! Redirecting...');
      
      // Wait 1.5 seconds before redirecting so the user can read the message
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <AuthForm 
          isLogin={false} 
          onSubmit={handleRegister} 
          isLoading={isLoading} 
          error={error} 
          successMsg={successMsg}
        />
        
        {!successMsg && (
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Login here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;