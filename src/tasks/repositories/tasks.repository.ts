import { User } from 'src/auth/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { FilteredTaskDTO } from '../dto/filtered.task.dto';
import { TaskDTO } from '../dto/task.dto';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../task.status.model';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  public createTask = async (taskDto: TaskDTO, user: User): Promise<Task> => {
    const { title, description } = taskDto;

    const task = this.create({
      title: title,
      description: description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);

    return task;
  };

  public deleteTask = async (id: string): Promise<void> => {
    const foundTask = await this.findOne(id);

    if (!foundTask) {
    }
  };

  public getTasks = async (filteredTaskDTO: FilteredTaskDTO, user: User): Promise<Task[]> => {
    const { status, search } = filteredTaskDTO;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  };
}
