import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidV4 } from 'uuid';
import { TaskDTO } from './dto/task.dto';
import { FilteredTaskDTO } from './dto/filtered.task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks = (): Task[] => {
    return this.tasks;
  };

  public getTaskById = (id: string): Task => {
    const foundTask = this.tasks.find((task) => task.id === id);
    if (!foundTask) {
      throw new NotFoundException(`Could not find task with id: ${id}`);
    }

    return foundTask;
  };

  public getSearchedTasks(filteredDto: FilteredTaskDTO): Task[] {
    const { status, search } = filteredDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        return task.title.includes(search.toLowerCase()) ||
          task.description.includes(search.toLowerCase())
          ? true
          : false;
      });
    }

    return tasks;
  }

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
    //For validation
    //Still bad but `I will be back`
    this.getTaskById(id);

    const taskIndex = this.findTaskIndex(id);

    if (taskIndex < 0) {
      return false;
    } else {
      this.tasks.splice(taskIndex, 1);
      return true;
    }
  };

  public updateTaskStatus = (id: string, updatedStatus: TaskStatus): Task => {
    const task: Task = this.getTaskById(id);
    const taskIndex = this.findTaskIndex(id);

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
