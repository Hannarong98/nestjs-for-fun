import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidV4 } from 'uuid';
import { TaskDTO } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks = (): Task[] => {
    return this.tasks;
  };

  public getTaskById = (id: string): Task => {
    return this.tasks.find((task) => task.id === id);
  };

  public createTask = (taskDto: TaskDTO): Task => {
    const { title, description } = taskDto;

    const task: Task = {
      id: uuidV4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  };

  public deleteTaskById = (id: string): boolean => {
    const taskIndex = this.findTaskIndex(id);

    if (taskIndex <= 0) {
      return false;
    } else {
      this.tasks.splice(taskIndex, 1);
      return true;
    }
  };

  public updateTaskStatus = (id: string, updatedStatus: TaskStatus): Task => {
    const taskIndex = this.findTaskIndex(id);
    const task: Task = this.tasks[taskIndex];

    const updatedTask: Task = {
      ...task,
      status: updatedStatus,
    };

    this.tasks.splice(taskIndex, 1);

    this.tasks.push(updatedTask);

    return updatedTask;
  };

  private findTaskIndex = (taskId: string): number =>
    this.tasks.findIndex((task) => task.id === taskId);
}
