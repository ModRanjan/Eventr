export interface FormEventValues {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  profileURL?: string;
  coverURL?: string;
}

export interface FormCreateEvent {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  profileURL: string;
  coverURL: string;
}

export interface FormUpdateEvent {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  profileURL: string;
  coverURL: string;
}
