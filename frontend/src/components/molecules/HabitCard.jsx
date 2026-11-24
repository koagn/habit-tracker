// src/components/molecules/HabitCard.jsx
import React from 'react';

const HabitCard = ({ habit, onToggleLog, isCompletedToday }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      marginBottom: '10px',
      backgroundColor: isCompletedToday ? '#e6ffe6' : 'white' // Green background if done!
    }}>
      <div>
        <h3 style={{ margin: 0 }}>{habit.name}</h3>
        <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>{habit.description}</p>
      </div>

      {/* 👈 The Checkbox (uses a native HTML input checkbox) */}
      <input 
        type="checkbox" 
        checked={isCompletedToday} 
        onChange={() => onToggleLog(habit.id, isCompletedToday)}
        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
      />
    </div>
  );
};

export default HabitCard;
