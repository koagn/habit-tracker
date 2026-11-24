import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import 'dotenv/config';

export const protect = async (req, res, next) => {
  let token;

  // 👈 1. Check if the request has an Authorization header starting with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 👈 2. Extract the token (Split "Bearer <token>" and take the second part)
      token = req.headers.authorization.split(' ')[1];

      // 👈 3. Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 👈 4. Find the user in the database (excluding the password) and attach to req.user
      // This makes the user's info available to all subsequent controllers
      req.user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true } 
      });

      // 👈 5. Call next() to pass control to the actual controller (e.g., createHabit)
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};