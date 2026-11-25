import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import habitRoutes from './routes/habitRoutes.js';
import logRoutes from './routes/logRoutes.js'; // 👈 Ensure this is imported if you use it

const app = express();

// 👈 Step 2 Fix: Allow ALL origins. 
// This guarantees Vercel can talk to Render without CORS blocking it.
app.use(cors()); 

app.use(express.json());

// Health check (to see if it's alive)
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Habit Tracker API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});