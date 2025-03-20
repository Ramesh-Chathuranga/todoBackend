import { Request, Response } from 'express';
import Todo from '../models/todo.modal';
import logger from '../utils/logger';

export const createTodo = async (req: Request, res: Response) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        logger.info(`Todocreated: ${todo._id}`);
        res.status(201).json({ data: todo, message: 'Todo created succesfully' });
    } catch (error: any) {
        logger.error('Error creating todo:', error);
        res.status(400).json({ error, message: error.message });
    }
};

export const getTodos = async (req: Request, res: Response) => {
    try {
        const { status, priority, search } = req.query;
        const filter: any = {};
        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (search) filter.title = { $regex: search, $options: 'i' };

        const todos = await Todo.find(filter)
        // .populate('dependencies');
        res.json({ data: todos, message: 'Todo retrieve successfully' });
    } catch (error: any) {
        logger.error('Error fetching todos:', error);
        res.status(500).json({ error: error.message, message: 'Todo retrieve successfully' });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        logger.info(`Todo updated: ${req.params.id}`);
        res.json({ data: todo, message: 'Your task has been updated' });
    } catch (error: any) {
        logger.error('Error updating todo:', error);
        res.status(400).json({ error, message: error.message });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        logger.info(`Todo deleted: ${req.params.id}`);
        res.json({ message: 'Todo deleted', data: { id: req.params.id } });
    } catch (error: any) {
        logger.error('Error deleting todo:', error);
        res.status(500).json({ error, message: error.message });
    }
};

export const getTodoById = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findById(req.params.id);
        logger.info(`get todo: ${req.params.id}`);
        res.json({ data: todo, message: 'Your task has been retrieve' });
    } catch (error: any) {
        logger.error('Error geting todo by id:', error);
        res.status(500).json({ error, message: error.message });
    }
}