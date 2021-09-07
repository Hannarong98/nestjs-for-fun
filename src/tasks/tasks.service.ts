import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.model';
import { TaskDTO } from './dto/task.dto';
import { FilteredTaskDTO } from './dto/filtered.task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './repositories/task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  public getTaskById = async (id: string): Promise<Task> => {
    const foundTask = await this.taskRepository.findOne(id);

    if (!foundTask) {
      throw new NotFoundException(`Could not find task with id: ${id}`);
    }

    return foundTask;
  };

  public getTasks = async (
    filteredTaskDTO: FilteredTaskDTO,
  ): Promise<Task[]> => {
    return this.taskRepository.getTasks(filteredTaskDTO);
  };

  public createTask = (taskDto: TaskDTO): Promise<Task> => {
    return this.taskRepository.createTask(taskDto);
  };

  public deleteTaskById = async (id: string): Promise<void> => {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Could not find task with id: ${id}`);
    }
  };

  public updateTaskStatus = async (
    id: string,
    updatedStatus: TaskStatus,
  ): Promise<Task> => {
    const task = await this.getTaskById(id);

    task.status = updatedStatus;

    await this.taskRepository.save(task);

    return task;
  };
}
