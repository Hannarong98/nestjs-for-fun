import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.status.model';

export class TaskStatusDTO {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
