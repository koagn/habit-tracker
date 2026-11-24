import express from 'express';
import { checkInHabit, undoCheckIn } from '../controllers/logController.js';
import { protect } from '../middleware/protect.js';

// 👈 mergeParams: true is CRITICAL here. 
// It allows this router to access the :habitId from the parent route (habitRoutes.js)
const router = express.Router({ mergeParams: true });

router.use(protect); // Secure these routes

// POST /api/habits/:habitId/logs -> Check in
router.post('/', checkInHabit);

// DELETE /api/habits/:habitId/logs -> Undo check in
router.delete('/', undoCheckIn);

export default router;