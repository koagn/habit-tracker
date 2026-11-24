import prisma from '../lib/prisma.js';

// 1. CHECK-IN A HABIT (Create a log)
export const checkInHabit = async (req, res) => {
  try {
    const { habitId } = req.params;
    // 👈 The frontend will send the date (e.g., "2024-05-20"). 
    // If it doesn't, we default to right now.
    const { date } = req.body; 
    const logDate = date ? new Date(date) : new Date();

    // 👈 SECURITY CHECK: Does this habit exist, and does it belong to the logged-in user?
    const habit = await prisma.habit.findUnique({
      where: { id: parseInt(habitId) },
    });

    if (!habit) return res.status(404).json({ error: 'Habit not found' });
    if (habit.userId !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized to log this habit' });
    }

    // 👈 CREATE THE LOG
    // Because of the @@unique([habitId, date]) rule in our schema, 
    // Prisma will automatically prevent duplicate check-ins on the same day.
    const log = await prisma.habitLog.create({
      data: {
        habitId: parseInt(habitId),
        date: logDate,
      },
    });

    res.status(201).json(log);
  } catch (error) {
    // If the user tries to check in twice, Prisma throws a specific error code (P2002)
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Habit already checked in for this date' });
    }
    console.error(error);
    res.status(500).json({ error: 'Failed to check in habit' });
  }
};

// 2. UNDO CHECK-IN (Delete a log)
export const undoCheckIn = async (req, res) => {
  try {
    const { habitId } = req.params;
    const { date } = req.body; 
    const logDate = date ? new Date(date) : new Date();

    // 👈 Find the specific log for this habit and date
    const log = await prisma.habitLog.findUnique({
      where: {
        habitId_date: { // This is the composite unique key we defined in the schema
          habitId: parseInt(habitId),
          date: logDate,
        },
      },
      include: { habit: true } // Include habit to check ownership
    });

    if (!log) return res.status(404).json({ error: 'Log not found' });
    
    // Security check
    if (log.habit.userId !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    // 👈 DELETE THE LOG
    await prisma.habitLog.delete({
      where: { id: log.id },
    });

    res.json({ message: 'Check-in removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to undo check-in' });
  }
};