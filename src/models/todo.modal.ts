import mongoose, { Schema, Document } from 'mongoose';

type TodoPriority = 'Low' | 'Medium' | 'High';
type TodoStatus = 'todo' | 'done';
type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly';

export interface ITodo extends Document {
  title: string;
  status: TodoStatus;
  priority: TodoPriority;
  createdAt: Date;
  completedAt?: Date;
  recurrence: RecurrenceType;
  dependencies: mongoose.Types.ObjectId[];
}

const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  status: { type: String, enum: ['todo', 'done'], default: 'todo' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  recurrence: { type: String, enum: ['none', 'daily', 'weekly', 'monthly'], default: 'none' },
  dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
});

export default mongoose.model<ITodo>('Todo', TodoSchema);
