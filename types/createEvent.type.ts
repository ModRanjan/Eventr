import { File } from './file.type';

export interface CreateEvent {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  profile?: File;
  cover?: File;
}
