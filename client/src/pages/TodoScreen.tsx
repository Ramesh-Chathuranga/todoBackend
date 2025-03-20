import { useState, useCallback, useEffect } from "react";
import { Header } from "@/components";
import { bg_white } from "../intilizer/style";
import { SearchComponent } from "@/components/molecule/Search";
import { FilterButton } from '@/components/molecule/Filter';
import { useTasks } from "../intilizer/hooks/useTask";
import TodoList from "@/components/organism/TodoList";


const TodoScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const {
    tasks, updateTask, deleteTask, toggleTaskStatus, canCompleteTask, getTaskById, sort, setSort, filter, setFilter, addTask
  } = useTasks();


  useEffect(() => {
    setFilter(prev => ({
      ...prev,
      search: searchText
    }));
  }, [searchText, setFilter]);

  const handleSearch = useCallback((term: string) => {
    setSearchText(term);
  }, []);


  


  return (
    <div className="min-h-screen bg-linear-to-r/srgb from-white to-teal-400 px-4 py-6 md:px-6 md:py-12 flex flex-col items-center">
      <header className="mx-auto max-w-4xl">
        <Header onAddTask={addTask} />
      </header>
      <main className="animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchComponent
              onSearch={handleSearch}
            />
          </div>
          <FilterButton
            filter={filter}
            sort={sort}
            onFilterChange={setFilter}
            onSortChange={setSort}
          />
        </div>
        <TodoList
          tasks={tasks}
          onToggleStatus={toggleTaskStatus}
          onDelete={deleteTask}
          onUpdate={updateTask}
          canCompleteTask={canCompleteTask}
          getTaskById={getTaskById}
        />
      </main>
      {/* <footer className={`mt-12 w-full text-center text-sm text-muted-foreground animate-fade-in ${bg_white}`} style={{ animationDelay: "200ms" }}>
        <p className="text-[16px] orange-text-gradient">Advanced ToDo List</p>
      </footer> */}
    </div>
  )
}

export default TodoScreen


