export interface IUser {
  name?: string;
  userName?: string;
  email?: string;
  walletAddress?: string;
  nonce?: string;
  deletedAt?: Date;
}

export interface IBreadCrumb {
  route: string;
  label: string;
  link: string;
}

export enum Page {
  LandingPage = 'Eventr',
  OverviewPage = 'Overview', // My Events
  AllEventsPage = 'Events', // All Deployed Events
  SettingsPage = 'Settings',
}

export enum OverviewPages {
  CreateEventPage = 'Create Event',
  EventDetailPage = 'Event Details',
  EditEventPage = 'Edit Event',
  CreatePassPage = 'Create Pass',
  EditPassPage = 'Edit Pass',
  PassCategoryPage = 'Pass Tokens',
  CreatePassCategoryPage = 'Create Pass-Category',
  EditPassCategoryPage = 'Update Pass-Category',
}

export enum EventsPages {
  PurchasePage = 'Buy Event Token',
}
