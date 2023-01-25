export const ROUTES = {
  home: () => '/Home',
  events: {
    create: () => `/Events/`,
    view: (eventSlug: string) => `/Events/${eventSlug}`,
    edit: (eventSlug: string) => `/Events/${eventSlug}/edit`,
  },
  passes: {
    create: (eventSlug: string) => `/Events/${eventSlug}/Passes/`,
    edit: (eventSlug: string) => `/Events/${eventSlug}/Passes/edit`,
  },
  passCategory: {
    edit: (eventSlug: string) => `/Events/${eventSlug}/PassCategory/edit/`,
    create: (eventSlug: string) => `/Events/${eventSlug}/PassCategory/`,
    view: (eventSlug: string) => `/Events/${eventSlug}/PassCategory/view/`,
  },
  settings: {
    profile: () => `/settings/`,
    accounts: () => `/settings/accounts`,
  },
};

// export const getTab = (path: string) => {
//   if (['/', '/co-create', '/rewards'].includes(path)) return;
//   if (path.includes('profile')) return;
//   if (path.includes('milestone')) return PAGES_ID.milestones;
//   if (path.includes('co-create') || path.includes('prompt'))
//     return PAGES_ID.prompts;
//   if (path.includes('members') || path.includes('prompt'))
//     return PAGES_ID.members;
//   return PAGES_ID.overview;
// };
