export type file = {
  url: string;
  size?: string;
  type: 'Profile' | 'Cover';
  mimeType: 'image' | 'video' | string;
  extension: string;
};
