import React, { forwardRef, useRef, useState, useImperativeHandle, useMemo, useEffect } from 'react'
import { Label } from "radix-ui";
import { Input } from '../atoms/input';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "../atoms/Selector"
import { TaskPriority, RecurrenceType, RecurrenceConfig, Task } from '@/intilizer/modal/task';
import { priorityList, recurrenceList, setText } from '../../intilizer/constat';
import { cn } from '@/intilizer/utils';
import { Checkbox } from '../atoms/Checkbox';
import { bg_white } from '../../intilizer/style';




interface Props {
    onAddToDo: (
        title: string,
        priority: TaskPriority,
        recurrence: RecurrenceType,
        dependencies: string[],
    ) => void,
    taskList: Task[];
}

interface PropRef {
    onClick: () => void
}

const Form = forwardRef<PropRef, Props>(({ onAddToDo, taskList, task }, ref) => {
    const [title, setTitle] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [priority, setPriority] = useState<TaskPriority>('Medium');
    const [recurrence, setRecurrence] = useState<RecurrenceType>('none');
    const [dependencies, setDependencies] = useState<string[]>([]);
    const [valid, setValid] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);


    useEffect(() => {
        if (task && task?.id) {
            onTextChange(task.title);
            setRecurrence(task?.recurrence);
            setPriority(task?.priority);
            const list: string[] = task?.dependencies;
            setDependencies(list)
        }
    }, [task])


    useImperativeHandle(ref, () => ({
        onClick: () => {
            onTodo(); // Call the function when ref is triggered
        },
    }));

    const onTodo = () => {
        if (valid) {
            onAddToDo(title, priority, recurrence, dependencies);
        } else {
            setError(true)
        }
    }


    const handleDependencyChange = (taskId: string, checked: boolean) => {
        if (checked) {
            setDependencies([...dependencies, taskId]);
        } else {
            setDependencies(dependencies.filter(id => id !== taskId));
        }
    };

    const onTextChange = (text: string) => {
        setTitle(text);
        setError(false);
        setValid(text?.trim()?.length > 1)
    }


    const todoTasks: Task[] = useMemo(() => {
        if (task || task?.id) {
          return taskList.filter(item => item?.id!=task.id && item.status === 'todo' && !item?.dependencies?.includes(task.id));
        }
    
        return taskList.filter(task => task.status === 'todo');
    }, [taskList,task]);
    // const todoTasks: Task[] = useMemo(() =>
    //     taskList.filter(task => task.status === 'todo'),
    //     [taskList, task]);

    return (
        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label.Root htmlFor="title" className="text-sm font-medium">
                    Task title
                </Label.Root>
                <Input
                    id="title"
                    ref={inputRef}
                    value={title}
                    onChange={(e) => {
                        const text: string = e.target.value;
                        onTextChange(text)
                    }}
                    placeholder="Enter task title..."
                    className={`${bg_white} ${error ? 'border-b-rose-600 bg-pink-100' : ''}`}
                    required
                />
                {error && <Label.Root className="text-[12px] text-red-400 fontlight" htmlFor="firstName">
                    Please add title
                </Label.Root>}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label.Root htmlFor="priority" className="text-sm font-medium">
                        Priority
                    </Label.Root>
                    <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                        <SelectTrigger id="priority" className={`${bg_white} ${priority == 'High' ? 'focus:border-red-500' : priority == 'Medium' ? 'focus:border-amber-400' : 'focus:border-green-400'} focus:ring-teal-50 focus:ring-0 focus:outline-none`}>
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className={bg_white}>
                            {priorityList.map((item: TaskPriority) => (
                                <SelectItem key={item} value={item}>
                                    <div className={`flex items-center ${item == 'High' ? 'text-red-500' : item == 'Medium' ? 'text-amber-400' : 'green-text-gradient'}`}>
                                        <span className={`h-2 w-2 rounded-full bg-priority-low mr-2`}></span>
                                        {item}
                                    </div>
                                </SelectItem>
                            ))}

                        </SelectContent>
                    </Select>
                    <div className="grid gap-2">
                        <Label.Root htmlFor="recurrence" className="text-sm font-medium">
                            Recurrence
                        </Label.Root>
                        <Select value={recurrence} onValueChange={(value) => setRecurrence(value)}>
                            <SelectTrigger id="recurrence" className={`${bg_white} focus:border-blue-400 focus:ring-blue-50 focus:ring-2 focus:outline-none`}>
                                <SelectValue placeholder="Select recurrence" />
                                <SelectContent className={bg_white}>
                                    {recurrenceList.map((item: RecurrenceConfig) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            <div className={`flex items-center blue-text-gradient`}>
                                                <span className="h-2 w-2 rounded-full bg-priority-low mr-2"></span>
                                                {item.label}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </SelectTrigger>
                        </Select>
                    </div>
                </div>
                {todoTasks.length > 0 && (
                    <div className="grid gap-2">
                        <Label.Root className="text-[10px] font-light text-gray-500">
                            Dependencies (This task will only be completable after its dependencies)
                            <div className="max-h-32 overflow-y-auto pr-2 space-y-2">
                                {todoTasks.map((task) => (
                                    <div key={task.id} className={`flex items-center space-x-2  !my-1.5 ${task.priority == 'High' ? 'text-red-500' : task.priority == 'Medium' ? 'text-amber-400' : 'text-green-500'}`}>
                                        <Checkbox
                                            className={`${task.priority == 'High' ? 'border-red-500' : task.priority == 'Medium' ? 'border-amber-400' : 'border-green-500'}`}
                                            id={`dep-${task.id}`}
                                            checked={dependencies.includes(task.id)}
                                            onCheckedChange={(checked) =>
                                                handleDependencyChange(task.id, checked as boolean)
                                            }
                                        />
                                        <Label.Root
                                            htmlFor={`dep-${task.id}`}
                                            className={`text-[10px] cursor-pointer flex items-center !ml-1.5`}
                                        >
                                            {task.title}
                                            <span
                                                className={cn(
                                                    "ml-2 h-2 w-2 rounded-full",
                                                    task.priority === 'Low' && "bg-priority-low",
                                                    task.priority === 'Medium' && "bg-priority-medium",
                                                    task.priority === 'High' && "bg-priority-high"
                                                )}
                                            />
                                        </Label.Root>
                                    </div>
                                ))}
                            </div>
                        </Label.Root>
                    </div>
                )}
            </div>
        </div >
    )
})

export default Form
