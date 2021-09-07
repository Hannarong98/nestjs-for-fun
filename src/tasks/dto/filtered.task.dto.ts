import { TaskStatus } from '../task.model';

export class FilteredTaskDTO {
  status?: TaskStatus;
  search?: string;
}
