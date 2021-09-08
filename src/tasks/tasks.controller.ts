import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { FilteredTaskDTO } from './dto/filtered.task.dto';
import { TasksService } from './tasks.service';
import { TaskStatusDTO } from './dto/task.status.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { RequestUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filteredTaskDto: FilteredTaskDTO,
    @RequestUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filteredTaskDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @RequestUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() taskDto: TaskDTO,
    @RequestUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(taskDto, user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id')
    id: string,
    @RequestUser()
    user: User,
  ): Promise<void> {
    return this.tasksService.deleteTaskById(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() taskStatusDTO: TaskStatusDTO,
    @RequestUser()
    user: User,
  ): Promise<Task> {
    const { status } = taskStatusDTO;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
