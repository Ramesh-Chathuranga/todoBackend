import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../atoms/dilaog';
import { Button } from '../atoms/button';
import { bg_white } from '../../intilizer/style';

interface Props {
  open: boolean,
  onOpenChange: () => void,
  onLeft: () => void,
  onRight: () => void,
  title: string,
  description?: string,
  buttonLeft: string,
  buttonRight: string,
  children?: React.ReactNode,
  isContent: boolean
}

const CustomDialog: React.FC<Props> = ({ open, onOpenChange, onLeft, onRight, title, description, buttonLeft, buttonRight, children, isContent = false }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${bg_white} border-none shadow-lg animate-scale-in sm:max-w-md bg-white`}>
        <DialogHeader>
          <DialogTitle className='blue-text-gradient font-bold !mb-2'>{title}</DialogTitle>
          <DialogDescription className='text-[12px] font-semibold text-gray-500'>
            {description}
          </DialogDescription>
        </DialogHeader>
        {isContent && children}
        <DialogFooter>
          <Button className='border-red-400 text-red-400' variant="outline" onClick={() => onLeft()}>
            {buttonLeft}
          </Button>
          <Button className='blue-text-gradient' variant="destructive" onClick={() => onRight()}>
            {buttonRight}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog
