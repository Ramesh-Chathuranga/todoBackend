import { Request, Response, NextFunction } from 'express';
import Todo from '../models/todo.modal';
import logger from '../utils/logger';

export const checkTodokDependency = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const todoId = req.params.id;
    const dependentTodo = await Todo.findOne({ dependencies: todoId });

    if (dependentTodo) {
      logger.warn(`Attempt to delete todo ${todoId} which is a dependency`);
      res.status(400).json({ message: 'Todo is being used as a dependency and cannot be deleted.' });
    }else{
        next();
    }   
  } catch (error: any) {
    logger.error('Error checking todo dependency:', error);
    res.status(500).json({ error: error.message });
  }

};