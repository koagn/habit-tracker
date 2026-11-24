// src/components/molecules/AuthForm.jsx
import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

// 👈 We pass 'isLogin' as a prop so the form knows which mode it is in
const AuthForm = ({ isLogin, onSubmit, isLoading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // 👈 Prevents the page from refreshing
    onSubmit(email, password); // 👈 Sends the data up to the Page
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
      <h2 style={{ textAlign: 'center' }}>{isLogin ? 'Login' : 'Create Account'}</h2>
      
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <Input 
        label="Email" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      
      <Input 
        label="Password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />

      <Button type="submit" isLoading={isLoading}>
        {isLogin ? 'Login' : 'Register'}
      </Button>
    </form>
  );
};

export default AuthForm;