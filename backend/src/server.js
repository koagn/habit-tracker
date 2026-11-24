import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import habitRoutes from './routes/habitRoutes.js'; // 👈 Import habit routes

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Habit Tracker API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes); // 👈 Plug in the habit routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});