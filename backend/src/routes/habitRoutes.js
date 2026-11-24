import express from 'express';
import { 
  createHabit, 
  getHabits, 
  updateHabit, 
  deleteHabit 
} from '../controllers/habitController.js';
import { protect } from '../middleware/protect.js';
import logRoutes from './logRoutes.js'; // 👈 Import the new log routes

const router = express.Router();

router.use(protect); 

router.route('/')
  .post(createHabit)
  .get(getHabits);

router.route('/:id')
  .put(updateHabit)
  .delete(deleteHabit);

// 👈 Forward any request with /:habitId/logs to the logRoutes file
router.use('/:habitId/logs', logRoutes); 

export default router;