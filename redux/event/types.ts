export interface IEvent {
  title: string;
  slug?: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  published: boolean;
}
