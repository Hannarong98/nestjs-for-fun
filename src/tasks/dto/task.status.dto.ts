import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.status.model';

export class TaskStatusDTO {
  @ApiProperty({ enum: ['OPEN', 'IN_PROGRESS', 'DONE'] })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
