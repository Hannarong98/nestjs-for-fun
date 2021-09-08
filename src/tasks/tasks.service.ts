import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.model';
import { TaskDTO } from './dto/task.dto';
import { FilteredTaskDTO } from './dto/filtered.task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './repositories/tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  public getTaskById = async (id: string, user: User): Promise<Task> => {
    const foundTask = await this.taskRepository.findOne({
      where: { id, user },
    });

    if (!foundTask) {
      throw new NotFoundException(`Could not find task with id: ${id}`);
    }

    return foundTask;
  };

  public getTasks = async (
    filteredTaskDTO: FilteredTaskDTO,
    user: User,
  ): Promise<Task[]> => {
    return this.taskRepository.getTasks(filteredTaskDTO, user);
  };

  public createTask = (taskDto: TaskDTO, user: User): Promise<Task> => {
    return this.taskRepository.createTask(taskDto, user);
  };

  public deleteTaskById = async (id: string, user: User): Promise<void> => {
    const result = await this.taskRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Could not find task with id: ${id}`);
    }
  };

  public updateTaskStatus = async (
    id: string,
    updatedStatus: TaskStatus,
    user: User,
  ): Promise<Task> => {
    const task = await this.getTaskById(id, user);

    task.status = updatedStatus;

    await this.taskRepository.save(task);

    return task;
  };
}
