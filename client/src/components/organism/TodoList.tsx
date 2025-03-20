import React, { useMemo, useEffect, useState } from 'react';
import { Task} from '@/intilizer/modal/task';
import TodoItem from './TodoItem';
import { ClipboardList } from 'lucide-react';
import { bg_white } from '../../intilizer/style';

interface Props {
    tasks: Task[];
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updates: Partial<Omit<Task, 'id'>>) => void;
    canCompleteTask: (id: string) => boolean;
    getTaskById: (id: string) => Task | undefined;
}


const TodoList: React.FC<Props> = ({ tasks, onToggleStatus, onDelete, onUpdate, canCompleteTask, getTaskById }) => {
    const [list, setList]=useState<Task[]>([])

      useEffect(() => {
        setList(tasks)
        }, [tasks])

    const todoTasks = useMemo(() =>
        tasks.filter(task => task.status === 'todo'),
        [tasks]);

    const completedTasks = useMemo(() =>
        tasks.filter(task => task.status === 'done'),
        [tasks]);

    const getDependencyTasks = (task: Task):Task => {
      return task.dependencies.map((item: string) => getTaskById(item)).filter(Boolean) as Task[];
      
    };


    if (tasks.length === 0) {
        return (
            <div className={`text-center p-6 rounded-lg !mt-4 animate-fade-in flex flex-col items-center ${bg_white}`}>
                <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground text-[14px] md:text-[16px] font-light text-blue-300" />
                <h3 className="mt-4 text-lg font-medium text-[14px] md:text-[16px] blue-text-gradient">No tasks found</h3>
                <p className="mt-2 text-muted-foreground text-[10px] md:text-[14px] font-ligh blue-text-gradient">
                    Add a new task to get started or try adjusting your filters.
                </p>
            </div>
        );
    }


    return (
        <div className="mt-6 space-y-6 animate-fade-in">
            {todoTasks.length > 0 && (
                <section>
                    <div className="flex items-center !mb-4 !mt-10">
                        <h2 className="text-[16px] font-medium blue-text-gradient">To Do</h2>
                        <div className="!ml-3 inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary blue-text-gradient">
                            {todoTasks.length}
                        </div>
                    </div>
                    <ul className="space-y-2">
                        {todoTasks.map(task => (
                            <TodoItem
                                key={task.id}
                                task={task}
                                onToggleStatus={onToggleStatus}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                                canComplete={canCompleteTask(task.id)}
                                dependencyTasks={getDependencyTasks(task)}
                                allTasks={list}
                            />
                        ))}
                    </ul>
                </section>
            )}

            {completedTasks.length > 0 && (
                <section>
                    <div className="flex items-center !mb-4">
                        <h2 className="text-[16px] font-medium pink-text-gradient">Completed</h2>
                        <div className="!ml-3 inline-flex items-center justify-center rounded-full bg-muted px-2.5 py-0.5 text-sm font-medium text-muted-foreground pink-text-gradient">
                            {completedTasks.length}
                        </div>
                    </div>
                    <ul className="space-y-2">
                        {completedTasks.map(task => (
                            <TodoItem
                                key={task.id}
                                task={task}
                                onToggleStatus={onToggleStatus}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                                canComplete={true}
                                dependencyTasks={getDependencyTasks(task)}
                                allTasks={list}
                            />
                        ))}
                    </ul>
                </section>
            )}
        </div>
    )
}

export default TodoList
