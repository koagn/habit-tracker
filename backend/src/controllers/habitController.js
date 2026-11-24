import prisma from '../lib/prisma.js';

// 1. CREATE A HABIT (POST)
export const createHabit = async (req, res) => {
  try {
    const { name, description } = req.body;

    // 👈 req.user.id comes from our protect middleware!
    const habit = await prisma.habit.create({
      data: {
        name,
        description,
        userId: req.user.id, 
      },
    });

    res.status(201).json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create habit' });
  }
};

// 2. GET ALL HABITS FOR LOGGED-IN USER (GET)
export const getHabits = async (req, res) => {
  try {
    // 👈 We only fetch habits where the userId matches the logged-in user
    const habits = await prisma.habit.findMany({
      where: { userId: req.user.id },
      include: { logs: true }, // Include the check-in logs for each habit
    });

    res.json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch habits' });
  }
};

// 3. UPDATE A HABIT (PUT)
export const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // 👈 SECURITY: First check if the habit exists AND belongs to this user
    const habit = await prisma.habit.findUnique({ where: { id: parseInt(id) } });
    
    if (!habit) return res.status(404).json({ error: 'Habit not found' });
    if (habit.userId !== req.user.id) return res.status(401).json({ error: 'Not authorized' });

    const updatedHabit = await prisma.habit.update({
      where: { id: parseInt(id) },
      data: { name, description },
    });

    res.json(updatedHabit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update habit' });
  }
};

// 4. DELETE A HABIT (DELETE)
export const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    // 👈 SECURITY: Verify ownership before deleting
    const habit = await prisma.habit.findUnique({ where: { id: parseInt(id) } });
    
    if (!habit) return res.status(404).json({ error: 'Habit not found' });
    if (habit.userId !== req.user.id) return res.status(401).json({ error: 'Not authorized' });

    await prisma.habit.delete({ where: { id: parseInt(id) } });

    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete habit' });
  }
};