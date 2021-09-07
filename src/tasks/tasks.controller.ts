import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { FilteredTaskDTO } from './dto/filtered.task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { TaskStatusDTO } from './dto/task.status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get()
  getTask(@Query() filteredTaskDto: FilteredTaskDTO): Task[] {
    if (Object.keys(filteredTaskDto).length) {
      return this.tasksService.getSearchedTasks(filteredTaskDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() taskDto: TaskDTO): Task {
    return this.tasksService.createTask(taskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() taskStatusDTO: TaskStatusDTO,
  ): Task {
    const { status } = taskStatusDTO;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
