import { SecondService } from './second.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { AddTodoDto } from 'src/dto/add-toto.dto';
import { getAllTodoDto } from 'src/dto/get-all-todo.dt';
import Todo from 'src/entities/todo.entity';
import { DurationInterceptor } from 'src/interceptors/duration.interceptor';


@UseInterceptors (DurationInterceptor)
@Controller('second')
export class SecondController {

    constructor(private todoServices: SecondService) { }

    @Get()
    getListeSecond(
        @Query() mesParametres: getAllTodoDto
    ): Todo[] {
        return this.todoServices.getListeTodosService();
    }

    @Post()
    addTodo(
        @Body() newTodo: AddTodoDto
    ): Todo {
        return this.todoServices.addTodoService(newTodo)
    }

    @Get('/:id')
    getTodoById(
        @Param('id') id: number
    ) {
        return this.todoServices.getTodoByIdService(id);
    }

    @Delete('/:id')
    deleteTodo(
        @Param('id') id: number
    ) {
        return this.todoServices.deleteTodoService(id)
    }

    @Put('/:id')
    modifierTodo(
        @Param('id') id: number,
        @Body() newTodo: Partial<AddTodoDto>
    ) {
        return this.todoServices.modifierTodoService(newTodo, id);
    }
}
