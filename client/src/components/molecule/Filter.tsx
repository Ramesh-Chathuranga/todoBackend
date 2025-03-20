
import { useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/atom/selector';
import { Button } from '@/components/atoms/button';
import { 
  ArrowUpDown, 
  Check, 
  Clock, 
  Filter, 
  Flag, 
  RotateCcw, 
  X 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/atoms/dropdownMenu';
import { FilterConfig,SortConfig, TaskPriority, TaskStatus, RecurrenceType } from '@/intilizer/modal/task';
import { Badge } from '@/components/atoms/badge';
import { bg_white } from '@/intilizer/style';

interface FilterProps {
  filter:  FilterConfig;
  sort: SortConfig;
  onFilterChange: (filter:  FilterConfig) => void;
  onSortChange: (sort: SortConfig) => void;
}

export const FilterButton : React.FC<FilterProps> =({ filter, sort, onFilterChange, onSortChange })=> {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleStatusChange = (value: TaskStatus | 'all') => {
    if (value === 'all') {
      const { status, ...restFilter } = filter;
      onFilterChange(restFilter);
    } else {
      onFilterChange({ ...filter, status: value });
    }
  };
  
  const handlePriorityChange = (value: TaskPriority | 'all') => {
    if (value === 'all') {
      const { priority, ...restFilter } = filter;
      onFilterChange(restFilter);
    } else {
      onFilterChange({ ...filter, priority: value });
    }
  };
  
  const handleRecurrenceChange = (value:RecurrenceType | 'all') => {
    if (value === 'all') {
      const { recurrence, ...restFilter } = filter;
      onFilterChange(restFilter);
    } else {
      onFilterChange({ ...filter, recurrence: value });
    }
  };
  
  const handleSortChange = (option: SortConfig['option']) => {
    if (sort.option === option) {
      // Toggle direction if the same option is selected
      onSortChange({
        option,
        direction: sort.direction === 'asc' ? 'desc' : 'asc'
      });
    } else {
      // Default to descending for new sort option
      onSortChange({
        option,
        direction: 'desc'
      });
    }
  };
  
  const handleResetFilters = () => {
    onFilterChange({});
    onSortChange({ option: 'createdAt', direction: 'desc' });
  };
  
  const activeFiltersCount = 
    (filter.status ? 1 : 0) + 
    (filter.priority ? 1 : 0) + 
    (filter.recurrence ? 1 : 0);
  
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={`${bg_white} hover:bg-pink-400/60`}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-primary">{activeFiltersCount}</Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={`w-56 ${bg_white}`} align="start">
          <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs text-muted-foreground">Status</DropdownMenuLabel>
            <DropdownMenuItem 
              onClick={() => handleStatusChange('all')}
              className="flex items-center justify-between"
            >
              All
              {!filter.status && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleStatusChange('todo')}
              className="flex items-center justify-between"
            >
              To Do
              {filter.status === 'todo' && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleStatusChange('done')}
              className="flex items-center justify-between"
            >
              Completed
              {filter.status === 'done' && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs text-muted-foreground">Priority</DropdownMenuLabel>
            <DropdownMenuItem 
              onClick={() => handlePriorityChange('all')}
              className="flex items-center justify-between"
            >
              All
              {!filter.priority && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handlePriorityChange('Low')}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-priority-low mr-2"></span>
                Low
              </div>
              {filter.priority === 'Low' && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handlePriorityChange('Medium')}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-priority-medium mr-2"></span>
                Medium
              </div>
              {filter.priority === 'Medium' && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handlePriorityChange('High')}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-priority-high mr-2"></span>
                High
              </div>
              {filter.priority === 'High' && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs text-muted-foreground">Recurrence</DropdownMenuLabel>
            <DropdownMenuItem 
              onClick={() => handleRecurrenceChange('all')}
              className="flex items-center justify-between"
            >
              All
              {!filter.recurrence && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleRecurrenceChange('none')}
              className="flex items-center justify-between"
            >
              One-time
              {filter.recurrence === 'none' && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleRecurrenceChange('daily')}
              className="flex items-center justify-between"
            >
              Daily
              {filter.recurrence === 'daily' && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleRecurrenceChange('weekly')}
              className="flex items-center justify-between"
            >
              Weekly
              {filter.recurrence === 'weekly' && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleRecurrenceChange('monthly')}
              className="flex items-center justify-between"
            >
              Monthly
              {filter.recurrence === 'monthly' && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          {activeFiltersCount > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleResetFilters}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Filters
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={`${bg_white} hover:bg-pink-400/60`}>
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort: {sort.option.charAt(0).toUpperCase() + sort.option.slice(1)}
            <span className="ml-1">
              ({sort.direction === 'asc' ? '↑' : '↓'})
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={`w-48 ${bg_white}`} align="start">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => handleSortChange('createdAt')}
            className="flex items-center justify-between"
          >
            Date Created
            {sort.option === 'createdAt' && (
              sort.direction === 'asc' ? <ArrowUpDown className="h-4 w-4" /> : <ArrowUpDown className="h-4 w-4" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleSortChange('priority')}
            className="flex items-center justify-between"
          >
            Priority
            {sort.option === 'priority' && (
              sort.direction === 'asc' ? <ArrowUpDown className="h-4 w-4" /> : <ArrowUpDown className="h-4 w-4" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleSortChange('status')}
            className="flex items-center justify-between"
          >
            Status
            {sort.option === 'status' && (
              sort.direction === 'asc' ? <ArrowUpDown className="h-4 w-4" /> : <ArrowUpDown className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
