export const ROUTES = {
  home: () => '/Events',
  landingPage: () => '/',
  overviews: {
    events: () => `/Overviews/Events`,
    eventDetails: (eventId: string) => `/Overviews/${eventId}/EventDeatails`,
    eventTickets: (eventId: string) => `/Overviews/${eventId}/EventTickets`,
    eventCheckout: (eventId: string) => `/Overviews/${eventId}/EventCheckout`,
  },
  events: {
    create: () => `/Events/create`,
    view: (eventSlug: string) => `/Events/${eventSlug}`,
    edit: (eventSlug: string) => `/Events/${eventSlug}/edit`,
  },
  passes: {
    create: (eventSlug: string) => `/Events/${eventSlug}/Passes/`,
    edit: (eventSlug: string) => `/Events/${eventSlug}/Passes/edit`,
  },
  passCategory: {
    edit: (eventSlug: string) => `/Events/${eventSlug}/PassCategory/edit/`,
    create: (eventSlug: string) => `/Events/${eventSlug}/PassCategory/create`,
    view: (eventSlug: string) => `/Events/${eventSlug}/PassCategory/`,
  },
  settings: {
    profile: () => `/settings/`,
    accounts: () => `/settings/accounts`,
  },
  deployed: {
    view: (eventSlug: string) => `/Deployed/${eventSlug}/`,
    events: () => `/Deployed/`,
  },
};

type BreadcrumbRouteLabelsType = {
  [key: string]: string;
};

export const RouteLabelMap: BreadcrumbRouteLabelsType = {
  '/Events': 'Home',
  '/Events/create': 'Create',
  '/Events/[eventSlug]/edit': 'Edit Event',
  '/Events/[eventSlug]': 'Details',
  '/Events/[eventSlug]/Passes': 'Create Pass',
  '/Events/[eventSlug]/PassCategory': 'Tokens',
  '/Events/[eventSlug]/PassCategory/create': 'Create',
  '/Deployed': 'Deployed Events',
  '/Deployed/[eventId]': 'Details',
  '/Settings': 'Settings',
};

export const UNAUTHENTICATED_ROUTES = [
  '/Overviews/Events',
  '/Overviews/index-1',
  '/Overviews/index-2',
  '/Overviews/[eventId]/EventDeatails',
  '/Overviews/[eventId]/EventTickets',
  '/Overviews/[eventId]/EventCheckout',
];
