// src/components/atoms/Button.jsx
import React from 'react';

const Button = ({ children, isLoading, ...props }) => {
  return (
    <button 
      style={{ 
        padding: '10px 15px', 
        backgroundColor: isLoading ? '#ccc' : '#007bff', 
        color: 'white', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: isLoading ? 'not-allowed' : 'pointer',
        width: '100%',
        fontSize: '16px'
      }}
      disabled={isLoading}
      {...props}
    >
      {/* 👈 If loading, show text, otherwise show the button text */}
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;