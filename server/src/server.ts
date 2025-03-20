import mongoose from 'mongoose';
import './jobs/todo.cron';
import app from './app';
import config from './config/config';

const startServer = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
