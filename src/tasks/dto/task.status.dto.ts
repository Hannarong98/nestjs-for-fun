import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class TaskStatusDTO {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
