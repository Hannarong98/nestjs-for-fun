import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.status.model';

export class FilteredTaskDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
