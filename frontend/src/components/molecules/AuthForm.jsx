// src/components/molecules/AuthForm.jsx
import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const AuthForm = ({ isLogin, onSubmit, isLoading, error, successMsg }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isLogin ? 'Welcome Back' : 'Create an Account'}
      </h2>
      
      {/* 👈 Error Message Box */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center border border-red-200">
          {error}
        </div>
      )}

      {/* 👈 Success Message Box */}
      {successMsg && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm text-center border border-green-200">
          {successMsg}
        </div>
      )}

      <Input 
        label="Email Address" 
        type="email" 
        placeholder="you@example.com"
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      
      <Input 
        label="Password" 
        type="password" 
        placeholder="Create a strong password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        minLength="6" // 👈 Basic validation: password must be at least 6 characters
      />

      <div className="mt-2">
        <Button type="submit" isLoading={isLoading}>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;