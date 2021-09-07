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
import { TaskStatus } from './task.status.model';
import { TasksService } from './tasks.service';
import { TaskStatusDTO } from './dto/task.status.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filteredTaskDto: FilteredTaskDTO): Promise<Task[]> {
    return this.tasksService.getTasks(filteredTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() taskDto: TaskDTO): Promise<Task> {
    return this.tasksService.createTask(taskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() taskStatusDTO: TaskStatusDTO,
  ): Promise<Task> {
    const { status } = taskStatusDTO;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
