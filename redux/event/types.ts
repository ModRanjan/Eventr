export type file = {
  url: string;
  size?: string;
  type: 'Profile' | 'Cover';
  mimeType: 'image' | 'video' | string;
  extension: string;
};

export interface event {
  id: number;
  slug: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  Files: file[];
}
