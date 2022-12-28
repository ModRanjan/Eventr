export interface IUser {
  name?: string;
  userName?: string;
  email?: string;
  walletAddress?: string;
  nonce?: string;
  deletedAt?: Date;
}

export enum Page {
  LandingPage = 'Eventr',
  OverviewPage = 'Overview', // All Events
  CreateEventPage = 'Create Event',
  SettingsPage = 'Settings',
  EditPassPage = 'Edit Pass',
  PassCategoryPage = 'Pass Tokens',
  CreatePassCategoryPage = 'Create Pass-Category',
  UpdatePassCategoryPage = 'Update Pass-Category',
}

export enum OverviewPages {
  EventDetailPage = 'Event Details',
  EditEventPage = 'Edit Event',
  CreatePassPage = 'Create Pass',
  Passes = 'Passes',
}
