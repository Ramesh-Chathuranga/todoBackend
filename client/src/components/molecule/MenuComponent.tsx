import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/atoms/dropdownMenu';
import { Button } from '@/components/atoms/button';
import {
    Check,
    Edit,
    EllipsisVertical,
    Trash2,
    X
} from 'lucide-react';
import { Task } from '../../intilizer/modal/task';
import { bg_white } from '../../intilizer/style';


interface Props {
    task: Task,
    onToggleTodo: (id: string) => void,
    onEdit: () => void,
    onDelete: () => void,
    canComplete: boolean
}

const MenuComponent: React.FC<Props> = ({ task, onToggleTodo, onEdit, onDelete, canComplete }) => {

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className={'focus:ring-offset-white focus:ring-0 focus:outline-none focus-visible:ring-0 cursor-pointer'} asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50 group-hover:opacity-100 ">
                        <EllipsisVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={`${bg_white}`}>
                    <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className={'text-black cursor-pointer'} onClick={onEdit}>
                        <Edit className="h-4 w-4 !mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onToggleTodo(task.id)}
                        disabled={!canComplete && task.status !== 'done'}
                    >
                        {task.status === 'todo' ? (
                            <>
                                <Check className="h-4 w-4 !mr-2" />
                                Mark as done
                            </>
                        ) : (
                            <>
                                <X className="h-4 w-4 !mr-2" />
                                Mark as todo
                            </>
                        )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={onDelete}
                        className="text-destructive focus:text-destructive text-red-400 cursor-pointer"
                    >
                        <Trash2 className="h-4 w-4 !mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default MenuComponent
