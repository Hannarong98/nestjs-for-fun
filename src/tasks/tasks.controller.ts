import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UnauthorizedResponseModel } from 'src/common/responses/unauthorized.response.model';
import { NotFoundResponseModel } from 'src/common/responses/notfound.response.model';

@ApiTags('Tasks')
@ApiBearerAuth('Access token')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiOkResponse({ type: Task, isArray: true, description: 'All tasks owned by user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedResponseModel })
  public getTasks(
    @Query() filteredTaskDto: FilteredTaskDTO,
    @RequestUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filteredTaskDto, user);
  }

  @Get('/:id')
  @ApiOkResponse({ status: 200, type: Task, isArray: false, description: 'A task owned by user' })
  @ApiNotFoundResponse({
    description: 'Could not find task by specified id',
    type: NotFoundResponseModel,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedResponseModel })
  public getTaskById(@Param('id') id: string, @RequestUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @ApiResponse({ status: 201, type: Task, isArray: false, description: 'Created task' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedResponseModel })
  public createTask(@Body() taskDto: TaskDTO, @RequestUser() user: User): Promise<Task> {
    return this.tasksService.createTask(taskDto, user);
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Task deleted' })
  @ApiNotFoundResponse({
    description: 'Could not find task by specified id',
    type: NotFoundResponseModel,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedResponseModel })
  public deleteTaskById(
    @Param('id') id: string,
    @RequestUser() authorizedUser: User,
  ): Promise<void> {
    return this.tasksService.deleteTaskById(id, authorizedUser);
  }

  @Patch('/:id/status')
  @ApiNotFoundResponse({
    description: 'Could not find task by specified id',
    type: NotFoundResponseModel,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedResponseModel })
  @ApiOkResponse({ description: 'Updated task status', type: Task })
  public updateTaskStatus(
    @Param('id') id: string,
    @Body() taskStatusDTO: TaskStatusDTO,
    @RequestUser() user: User,
  ): Promise<Task> {
    const { status } = taskStatusDTO;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
