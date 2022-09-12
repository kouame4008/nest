import { AddTodoDto } from './../dto/add-toto.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import Todo from 'src/entities/todo.entity';

@Injectable()
export class SecondService {
    todos: Todo[] = [];

    getListeTodosService(): Todo[] {
        return this.todos;
    }

    addTodoService(newTodo: AddTodoDto) {
        const { name, description } = newTodo;
        let id: number;

        if (this.todos.length) {
            id = this.todos[this.todos.length - 1].id + 1;
        }
        else {
            id = 1;
        }

        const todo = {
            id,
            name,
            description,
            createdAt: new Date()
        }
        this.todos.push(todo);
        return todo;
    }

    getTodoByIdService(id: number) {
        const todo = this.todos.find((actuelTodo: Todo) => actuelTodo.id === +id);
        if (todo)
            return todo;
        throw new NotFoundException('Aucune donnée trouvée')
    }

    deleteTodoService(id: number) {
        const index = this.todos.findIndex((todo: Todo) => todo.id == +id);

        if (index >= 0) {
            this.todos.splice(index, 1);
        }
        else {
            throw new NotFoundException('Aucune donnée trouvée')
        }
    }

    modifierTodoService(newTodo: Partial<AddTodoDto>, id: number) {
        const todo = this.getTodoByIdService(id);
        todo.description = newTodo.description ? newTodo.description : todo.description;
        todo.name = newTodo.name ? newTodo.name : todo.name;

        return todo;
    }
}
