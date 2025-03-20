import { Task, ToDoResponse } from '../modal/task';
import { Repository } from './Repository';


class TodoRepository extends Repository {

    getTodos() {
        return this.getData<ToDoResponse<Task[]>>('/todo');
    }

    getTodoById(id: number) {
        return this.getData<ToDoResponse<Task>>(`/todo/${id}`);
    }

    createTodo(todo: Partial<Task>) {
        return this.postData<ToDoResponse<Task>>('/todo', todo);
    }

    updateTodo(id: number, todo: Partial<Task>) {
        return this.putData<ToDoResponse<Task>>(`/todo/${id}`, todo);
    }

    deleteTodo(id: number) {
        return this.deleteData<ToDoResponse<string>>(`/todo/${id}`);
    }
}

export default new TodoRepository();