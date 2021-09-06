import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() taskDto: TaskDTO): Task {
    return this.tasksService.createTask(taskDto);
  }
}
