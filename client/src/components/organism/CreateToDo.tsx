import React, { ReactNode, useRef, useState } from 'react'
import { Button } from '../atoms/button';
import { Plus } from 'lucide-react';
import CustomDialog from '../molecule/CustomDialog';
import Form from '../molecule/Form';
import { RecurrenceType, Task, TaskPriority } from '../../intilizer/modal/task';
import { useTasks } from '../../intilizer/hooks/useTask';

interface Props {
  onAddTask: (
    title: string,
    priority: TaskPriority,
    recurrence: RecurrenceType,
    dependencies: string[],
  ) => void
}

const CreateToDo: React.FC<Props> = ({ onAddTask }) => {
  const ref = useRef<{ onClick: () => void } | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const { tasks } = useTasks()

  const onOpenChange = () => {
    setOpen(false)
  }
  const onLeft = () => {
    setOpen(false)
  }
  const onRight = () => {
    ref.current?.onClick()
  }

  const onAddToDo = (title: string, priority: TaskPriority, recurrence: RecurrenceType, dependencies: string[]) => {
    onAddTask(title, priority, recurrence, dependencies)
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => {
        setOpen(true)
      }} className="transition-all duration-300 transform hover:scale-105 bg-pink-600 hover:bg-pink-400/60 text-white">
        <Plus className="mr-2 h-4 w-4" />
        Add Task
      </Button>
      <CustomDialog
        open={open}
        onOpenChange={onOpenChange}
        onLeft={onLeft}
        onRight={onRight}
        title='Add New Task'
        description='Create a new task to keep track of your work.'
        buttonLeft='Cancel'
        buttonRight='Create Task'
        isContent
      >
        <Form
          ref={ref}
          taskList={tasks}
          onAddToDo={onAddToDo} />
      </CustomDialog>
    </>
  )
}

export default CreateToDo
