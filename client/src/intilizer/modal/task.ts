export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'todo' | 'done';
export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly';

export interface TaskDependency {
  id: string;
  title: string;
}

export interface Task {
 id: string;
  title: string;
  completedAt?: Date;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  recurrence: RecurrenceType;
  dependencies: string[];
}

export type SortOption = 'createdAt' | 'priority' | 'status';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  option: SortOption;
  direction: SortDirection;
}

export interface FilterConfig {
  status?: TaskStatus;
  search?: string;
  recurrence?:  RecurrenceType;
  priority?: TaskPriority | 'all';
}

export interface RecurrenceConfig {
  label: string
  value: RecurrenceType
}

export interface ToDoResponse<T> {
  message: string;
  data: T;
  error?: any;
}