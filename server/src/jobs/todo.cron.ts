import cron from 'node-cron';
import Todo from '../models/todo.modal';
import logger from '../utils/logger';

cron.schedule('0 0 * * *', async () => {
  logger.info('Running scheduled task for recurring tasks');

  const todos = await Todo.find({ recurrence: { $ne: 'none' } });

  todos.forEach(async (todo) => {
    let date = new Date();
    if (todo.recurrence === 'daily') date.setDate(date.getDate() + 1);
    if (todo.recurrence === 'weekly') date.setDate(date.getDate() + 7);
    if (todo.recurrence === 'monthly') date.setMonth(date.getMonth() + 1);

    await new Todo({ ...todo.toObject(), _id: undefined, createdAt: date }).save();
    logger.info(`Recurring task created: ${todo.title} for ${date}`);
  });
});
