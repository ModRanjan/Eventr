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
  published?: boolean;
};

export interface CurrentEvent {
  event: Event;
  published: boolean;
  hasPass: boolean;
}

export interface IDeployedEvent {
  eventId: string;
  eventName: string;
  startDate: string;
  endDate: string;
  description: string;
  passName: string;
  passType: string;
  dropType: string;
  profileURL: string;
  coverURL: string;
  ownerAddress: string;
}
