
import { useState, useEffect } from 'react';
import { Input } from '@/components/atoms/input';
import { Search } from 'lucide-react';
import { bg_white } from '../../intilizer/style';

interface TaskSearchProps {
  onSearch: (title: string) => void;
}

export const SearchComponent :React.FC<TaskSearchProps> =({ onSearch })=> {
  const [text, setText] = useState('');
  
  // Debounce search to prevent too many rerenders
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(text);
    }, 300);
    
    return () => {
      clearTimeout(handler);
    };
  }, [text, onSearch]);
  
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <Input
        type="search"
        placeholder="Search tasks..."
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        className={`pl-10 ${bg_white} hover:bg-blue-50/60`}
      />
    </div>
  );
}