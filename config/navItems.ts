import { IconType } from 'react-icons';
import { FaChevronDown } from 'react-icons/fa';

export interface INavItemsData {
  name: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  dropdown: boolean;
  sublinks: {
    name: string;
    link: string;
  }[];
  link?: string;
}

export const PrimaryNavItems: INavItemsData[] = [
  {
    name: 'Home',
    dropdown: true,
    sublinks: [
      { name: 'Home One', link: '/Overviews/index-1' },
      { name: 'Home Two', link: '/Overviews/index-2' },
      { name: 'Landing Page', link: '/' },
    ],
  },
  {
    name: 'Events',
    dropdown: true,
    sublinks: [
      { name: 'Event', link: '/Overviews/Events' },
      { name: 'Event Details', link: '/Overviews/23/EventDeatails' },
      { name: 'Event Ticket', link: '/Overviews/23/EventTickets' },
      { name: 'Event checkout', link: '/Overviews/23/EventCheckout' },
    ],
  },
  {
    name: 'Contact',
    dropdown: false,
    sublinks: [],
    link: 'https://tailwindcss.com/docs/transition-duration',
  },
];

export const subNavItems: INavItemsData[] = [
  {
    name: 'Overview',
    dropdown: false,
    sublinks: [],
    link: '/Events',
  },
  {
    name: 'Events',
    dropdown: false,
    sublinks: [],
    link: '/Deployed',
  },
  {
    name: 'Settings',
    dropdown: false,
    sublinks: [],
    link: '/Settings',
  },
];
