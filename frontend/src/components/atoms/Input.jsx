// src/components/atoms/Input.jsx
import React from 'react';

const Input = ({ label, type = 'text', ...props }) => {
  return (
    <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
      {/* 👈 The Label */}
      <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>{label}</label>
      
      {/* 👈 The actual input field */}
      <input 
        type={type} 
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        {...props} // 👈 This passes things like value, onChange, required, placeholder
      />
    </div>
  );
};

export default Input;