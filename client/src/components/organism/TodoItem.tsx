import React, { useRef, useState, useEffect } from 'react';
import {
    Flag,
    Repeat,
    GitBranch,
} from 'lucide-react';
import { Badge } from '../atoms/badge';
import moment from 'moment';
import { Task, TaskPriority, RecurrenceType } from '@/intilizer/modal/task';
import { cn } from '@/intilizer/utils';
import { bg_white } from '../../intilizer/style';
import { Checkbox } from '../atoms/Checkbox';
import { recurrenceLabel } from '../../intilizer/constat';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../atoms/tooltips';
import MenuComponent from '../molecule/MenuComponent';
import CustomDialog from '../molecule/CustomDialog';
import Form from '../molecule/Form';
import { toast } from 'sonner';
import _ from "loadsh";



interface Props {
    task: Task,
    onToggleStatus?: (id: string) => void | undefined,
    onDelete?: (id: string) => void,
    onUpdate?: (id: string, data: Partial<Omit<Task, 'id'>>) => void,
    canComplete?: boolean,
    dependencyTasks?: Task[],
    allTasks?: Task[]
}

const TodoItem: React.FC<Props> = ({ task, canComplete = false, onToggleStatus = () => { }, dependencyTasks, onDelete = () => { }, allTasks = [], onUpdate = () => { } }) => {
    const ref = useRef<{ onClick: () => void } | null>(null);
    const [confirmDelet, setConfirmDelte] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [list, setList] = useState<Task[]>([]);

    const onUpdateToDo = (title: string, priority: TaskPriority, recurrence: RecurrenceType, dependencies: string[]) => {
        const data: Partial<Omit<Task, 'id'>> = {
            title, priority, recurrence, dependencies
        };
        onUpdate(task?.id, data)
        setEdit(false);
    }

    useEffect(() => {
        setList(allTasks);
    }, [allTasks]);

 
    return (
        <div className='!mb-5'>
            <li className={cn(
                "border rounded-lg p-4 mb-2 transition-all duration-300",
                "hover:shadow-md animate-fade-in group", bg_white,
                task.status === 'done' && "opacity-70"
            )}>
                <div className="flex items-start justify-between w-full">
                    <div className="flex items-start gap-3 flex-1">
                        <div className="pt-0.5">
                            <Checkbox
                                checked={task.status === 'done'}
                                onCheckedChange={() => {
                                    onToggleStatus(task.id)
                                }}
                                disabled={!canComplete && task.status !== 'done'}
                                className={cn(
                                    "transition-transform duration-300 ease-in-out",
                                    "group-hover:scale-110",
                                    !canComplete && task.status !== 'done' && "cursor-not-allowed"
                                )}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className={`text-[12px] font-medium text-base !mb-1 break-words ${task.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>
                                {task.title}
                            </h3>
                            <div className="flex flex-row justify-between items-center gap-2 text-xs">
                                <div className={`flex items-center ${task.priority == 'High' ? 'text-red-500' : task.priority == 'Medium' ? 'text-amber-400' : 'green-text-gradient'}`}>
                                    <Flag className={`h-3 w-3 !mr-2`} />
                                    {task.priority}
                                </div>
                                {task.recurrence !== 'none' && (
                                    <Badge variant="outline" className="flex items-center">
                                        <Repeat className="h-3 w-3 mr-1" />
                                        {recurrenceLabel[task?.recurrence]}
                                    </Badge>
                                )}
                                {task.dependencies.length > 0 && (
                                    <TooltipProvider >
                                        <Tooltip >
                                            <TooltipTrigger asChild>
                                                <Badge variant="outline" className="flex items-center">
                                                    <GitBranch className="h-3 w-3 mr-1" />
                                                    {task.dependencies.length} {task.dependencies.length === 1 ? 'dependency' : 'dependencies'}
                                                </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <div className="space-y-1">
                                                    <p className="text-xs font-semibold">Dependencies:</p>
                                                    <ul className="list-disc list-inside text-xs">
                                                        {dependencyTasks.map(depTask => (
                                                            <li key={depTask.id} className={cn(` ${depTask.priority == 'High' ? 'text-red-500' : depTask.priority == 'Medium' ? 'text-amber-400' : 'green-text-gradient'}`,
                                                                depTask.status === 'done' && "line-through"
                                                            )}>
                                                                {depTask.title}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>


                                )}
                                <span className="text-muted-foreground">
                                    Created :{moment(task.createdAt).format('MMM d, yyyy')}
                                </span>
                                {task.completedAt && (
                                    <span className="text-muted-foreground">
                                        Completed  :{moment(task.completedAt).format('MMM d, yyyy')}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <MenuComponent
                        onDelete={() => {
                            const isDependency = _.findIndex(allTasks, (item: Task) => item.dependencies.includes(task.id)) > -1;
                            if (isDependency) {
                                toast.error(<p className='text-[16px] text-red-400 font-light'>Error</p>, {
                                    description: <p className='text-[14px] text-red-400 font-light' >This task is already linked with other tasks as their dependency, unlinked from them</p>,
                                    duration: 5000,
                                })
                            } else {
                                setConfirmDelte(!confirmDelet);
                            }
                            setConfirmDelte(!confirmDelet);
                        }}
                        onEdit={() => {
                            setEdit(!edit);
                        }}
                        canComplete={canComplete}
                        onToggleTodo={onToggleStatus}
                        task={task}
                    />
                </div>
            </li>
            <CustomDialog
                open={confirmDelet}
                title='Confirm Deletion'
                description='Are you sure you want to delete this task? This action cannot be undone.'
                onLeft={() => {
                    setConfirmDelte(!confirmDelet);
                }}
                onRight={() => {
                    onDelete(task?.id);
                    setConfirmDelte(!confirmDelet);
                }}
                onOpenChange={() => {
                    setConfirmDelte(!confirmDelet);
                }}
                buttonLeft='Cancel'
                buttonRight='Delete'
            />
            <CustomDialog
                open={edit}
                title='Edit Task'
                description='Make changes to your task here.'
                onOpenChange={() => {
                    setEdit(!edit);
                }}
                onLeft={() => {
                    setEdit(!edit);
                }}
                onRight={() => {
                    //   onDelete(task?.id);
                    ref.current?.onClick()
                    setEdit(!edit);
                }}
                buttonLeft='Cancel'
                buttonRight='Save Changes'
                isContent
            >
                <Form
                    ref={ref}
                    onAddToDo={onUpdateToDo}
                    taskList={list}
                    task={task}
                />
            </CustomDialog>

        </div>
    )
}

export default TodoItem
