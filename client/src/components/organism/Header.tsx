import React from 'react';
import { CheckCheck, ClipboardCheck } from 'lucide-react';
import { bg_white } from '@/intilizer/style';
import CreateToDo from './CreateToDo';
import { TaskPriority, RecurrenceType } from '@/intilizer/modal/task';

interface Props {
  onAddTask:( 
    title: string,
    priority: TaskPriority,
    recurrence: RecurrenceType,
    dependencies: string[],
    )=> void
}
const Header: React.FC<Props> = ({onAddTask}) => {
  return (
    <header className={`rounded-xl p-6 !mb-8 animate-fade-in w-full !mx-aut bg-white ${bg_white}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="md:text-3xl sx:text-[16px] text-[10px] font-light pink-text-gradient mb-1 flex items-center gap-2">
            <ClipboardCheck className="hidden md:block  h-8 w-8 text-pink-500" />
            ADVANCED TODO LIST
          </h1>
          <p className="sm:text-[16px] text-[10px] font-medium text-center orange-text-gradient">
            Keep your todo tasks efficiently
          </p>
        </div>
        <CreateToDo onAddTask={onAddTask}/>
      </div>
    </header>
  )
}

export default Header
