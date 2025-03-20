
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Task, FilterConfig, SortConfig, TaskPriority, RecurrenceType } from '../modal/task';
import { toast } from 'sonner';
import TodoRepository from '../repository/TodoRepository';




export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<FilterConfig>({});
    const [sort, setSort] = useState<SortConfig>({ option: 'createdAt', direction: 'desc' });



    useEffect(() => {
        getInitList();
    }, [])



    const getInitList = async (): Promise<void> => {
        try {
            const data = await TodoRepository.getTodos();
            if (data?.data) {
                const list = data.data.map((i: Task) => {
                    return { ...i, createdAt: new Date(i?.createdAt), id: i._id }
                });
                setTasks(list)
            }
            toast(data?.message);
        } catch (error) {
            console.warn(error);
            toast('Error', { description: 'Something went wrong' });
        }
    }

    const addTask = useCallback(async (
        title: string,
        priority: TaskPriority = 'Medium',
        recurrence: RecurrenceType = 'none',
        dependencies: string[] = []
    ) => {
        let newTask: Task = []
        try {
            const data = await TodoRepository?.createTodo({ title, priority, recurrence, dependencies });
            if (data?.data) {
                newTask = {
                    ...data?.data,
                    id: data.data._id,
                    createdAt: new Date(data.data?.createdAt)
                }
                setTasks(currentTasks => [...currentTasks, newTask]);

            }
            toast(data?.message);
            return newTask
        } catch (error) {
            console.warn(error)
            toast('Error', { description: 'Something went wrong' });
            return []
        }
    }, []);

    //   toast

    const updateTask = useCallback(async (id: string, updates: Partial<Omit<Task, 'id'>>) => {
        const data = await TodoRepository.updateTodo(id, updates);
        try {

            if (data?.data) {
                const updateTask = {
                    ...data?.data,
                    id: data.data._id,
                    createdAt: new Date(data.data?.createdAt),

                }

                setTasks(currentTasks =>
                    currentTasks.map(task =>
                        task.id === id
                            ? {
                                ...task,
                                ...updateTask
                            }
                            : task
                    )
                );

            }

            toast(data?.data?.message)
        } catch (error) {
            toast(data?.data?.message)
            console.error(error)
        }


    }, []);
    //   toast

    const deleteTask = useCallback(async (id: string) => {
        const data = await TodoRepository.deleteTodo(id);
        try {
            toast.success(data.data.message);
            setTasks(currentTasks => currentTasks.filter(task => task.id !== data.id));
        } catch (error) {
            toast.error(data.data.message);
            console.warn(error);
        }
    }, []);

    //   toast

    const canCompleteTask = useCallback((taskId: string): boolean => {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return false;

        // If the task doesn't depend on any other tasks, it can be completed
        if (task.dependencies.length === 0) return true;

        // Check if all dependencies are completed
        return task.dependencies.every(dep => {
            const depTask = tasks.find(t => t.id === dep);
            return depTask && depTask.status === 'done';
        });
        return false
    }, [tasks]);

    const toggleTaskStatus = useCallback((id: string) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;

        if (task.status === 'todo') {
            // If task has dependencies, check if they are all completed
            if (!canCompleteTask(id)) {
                toast("Cannot complete task", {
                    description: "This task depends on other tasks that are not completed yet.",
                });
                return;
            }

            updateTask(id, { status: 'done', completedAt: new Date() });
        } else {
            updateTask(id, { status: 'todo', completedAt: undefined });
        }
    }, [tasks, updateTask, canCompleteTask,
        // toast
    ]);

    // Apply filters and sorting to the tasks
    const filteredAndSortedTasks = useMemo(() => {
        // First, apply filters
        const result = tasks.filter(task => {
            // Filter by status if specified
            if (filter.status && task.status !== filter.status) return false;

            // Filter by priority if specified
            if (filter.priority && task.priority !== filter.priority) return false;

            // Filter by recurrence pattern if specified
            if (filter.recurrence && task.recurrence !== filter.recurrence) return false;

            // Filter by search term if specified
            if (filter.search) {
                const searchTerm = filter.search.toLowerCase();
                if (!task.title.toLowerCase().includes(searchTerm)) return false;
            }

            return true;
        });

        // Then, sort the filtered results
        return result.sort((a, b) => {
            const direction = sort.direction === 'asc' ? 1 : -1;

            switch (sort.option) {
                case 'priority': {
                    const priorityOrder = {
                        'High': 0,
                        'Medium': 1,
                        'Low': 2
                    };
                    return (priorityOrder[a.priority] - priorityOrder[b.priority]) * direction;
                }
                case 'status':
                    return a.status.localeCompare(b.status) * direction;

                case 'createdAt':
                default:
                    return (a.createdAt.getTime() - b.createdAt.getTime()) * direction;
            }
        });
    }, [tasks, filter, sort]);

    const getTaskById = useCallback((id: string) => {
        return tasks.find(task => task.id === id);

    }, [tasks]);

    return {
        tasks: filteredAndSortedTasks,
        filter,
        setFilter,
        sort,
        setSort,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        canCompleteTask,
        getTaskById
    };
}