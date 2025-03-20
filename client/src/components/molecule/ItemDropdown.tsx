import React from 'react';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from '@/components/atoms/dropdownMenu';
import { Button } from '@/atoms/button';
import {
  Edit,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import { bg_white } from '../../intilizer/style';
// interface Props {

// }

const ItemDropdown: React.FC = () => {
  return (
    <div>
       <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={bg_white}>
              <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
              // onClick={() => setEditMode(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                // onClick={() => onToggleStatus(task.id)}
                // disabled={!canComplete && task.status !== 'done'}
              >
                {/* {task.status === 'todo' ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Mark as done
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Mark as todo
                  </>
                )} */}
                 Mark as todo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                // onClick={() => setConfirmDelete(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
    </div>
  )
}

export default ItemDropdown
