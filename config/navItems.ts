export type INavItemsData = {
  name: string;
  icon?: any;
  url: string;
}[];

export const navItems: INavItemsData = [
  {
    name: 'Docs',
    url: 'https://web3js.readthedocs.io/en/v1.7.5/',
  },
  {
    name: 'FAQ',
    url: '/all-users',
  },

  {
    name: 'Discord',
    url: '/',
  },
];

export const subNavItems: INavItemsData = [
  {
    name: 'Overview',
    url: '/Home',
  },
  {
    name: 'Events',
    url: '/Events',
  },
  {
    name: 'Settings',
    url: '/Settings',
  },
];
