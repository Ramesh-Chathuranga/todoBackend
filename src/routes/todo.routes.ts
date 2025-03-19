import express,{Request, Response, NextFunction} from 'express';
import { createTodo, deleteTodo, getTodos, updateTodo, getTodoById } from '../controllers/todod.controller';
import { checkTodokDependency } from '../middlewares/todo.middleware';



const router = express.Router();


router.get('/todo/:id', getTodoById);
router.post('/todo', createTodo);
router.get('/todo', getTodos);
router.put('/todo/:id', updateTodo);
router.delete('/todo/:id', checkTodokDependency , deleteTodo);

export default router;