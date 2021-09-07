import { IsNotEmpty } from 'class-validator';

export class TaskDTO {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
