import { AiFillHome, AiFillInfoCircle } from 'react-icons/ai';
import { ImDatabase } from 'react-icons/im';

export type INavItemsData = {
  name: string;
  icon?: any;
  url: string;
}[];

export const navItems: INavItemsData = [
  {
    name: 'Docs',

    url: '/',
  },
  {
    name: 'FAQ',

    url: '/all-users',
  },

  {
    name: 'Discord',

    url: 'https://web3js.readthedocs.io/en/v1.7.5/',
  },
];

export const SubNavItems = [
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
