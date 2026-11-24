// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import HabitCard from '../components/molecules/HabitCard';
import Button from '../components/atoms/Button';

const DashboardPage = () => {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newHabitName, setNewHabitName] = useState('');
  const navigate = useNavigate();

  // 👈 1. Fetch habits when the page loads
  const fetchHabits = async () => {
    try {
      const response = await api.get('/habits'); // Our Axios interceptor adds the token automatically!
      setHabits(response.data);
    } catch (error) {
      console.error('Failed to fetch habits', error);
      // If the token is bad, kick them back to login
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // 👈 2. Create a new habit
  const handleCreateHabit = async (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    try {
      const response = await api.post('/habits', { name: newHabitName });
      // Add the new habit to the list immediately without reloading
      setHabits([...habits, response.data]);
      setNewHabitName(''); // Clear the input
    } catch (error) {
      console.error('Failed to create habit', error);
    }
  };

  // 👈 3. Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // 👈 Helper to check if the habit is completed today
  const isCompletedToday = (habit) => {
    if (!habit.logs || habit.logs.length === 0) return false;
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Check if any log matches today's date
    return habit.logs.some(log => log.date.startsWith(today));
  };

  // 👈 4. Toggle a habit (Check/Uncheck)
  const handleToggleLog = async (habitId, currentlyCompleted) => {
    const today = new Date().toISOString().split('T')[0];

    try {
      if (currentlyCompleted) {
        // Uncheck: Send DELETE request
        await api.delete(`/habits/${habitId}/logs`, { data: { date: today } });
      } else {
        // Check: Send POST request
        await api.post(`/habits/${habitId}/logs`, { date: today });
      }
      
      // Refresh the habits list to get the updated logs
      fetchHabits();
    } catch (error) {
      console.error('Failed to toggle habit', error);
    }
  };

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Habits</h1>
        <button onClick={handleLogout} style={{ padding: '8px', cursor: 'pointer' }}>Logout</button>
      </div>

      {/* 👈 Create Habit Form */}
      <form onSubmit={handleCreateHabit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="New habit name..." 
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <Button type="submit">Add</Button>
      </form>

      {/* 👈 Display Habits */}
      <div>
        {habits.length === 0 ? (
          <p>You don't have any habits yet. Create one above!</p>
        ) : (
          habits.map(habit => (
            <HabitCard 
              key={habit.id} 
              habit={habit} 
              onToggleLog={handleToggleLog}
              isCompletedToday={isCompletedToday(habit)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;