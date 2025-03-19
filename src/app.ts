import express from 'express';
import toDoRoutes from './routes/todo.routes';
import cors from "cors";
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1', toDoRoutes);

export default app;