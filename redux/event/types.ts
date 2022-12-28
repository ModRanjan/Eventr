export type File = {
  url: string;
  size?: string;
  type: 'Profile' | 'Cover';
  mimeType: 'image' | 'video' | string;
  extension: string;
};

/**
 *
 */
export type Event = {
  id: number;
  slug: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  Files?: File[];
};

export interface CurrentEvent {
  event: Event;
  published: boolean;
  hasPass: boolean;
}
