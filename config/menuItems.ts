import { AiFillHome, AiFillInfoCircle } from 'react-icons/ai';
import { ImDatabase } from 'react-icons/im';

export type IMenuItemData = {
  name: string;
  icon: any;
  url: string;
}[];
const menuItemData: IMenuItemData = [
  {
    name: 'Home',
    icon: AiFillHome,
    url: '/',
  },
  {
    name: 'All Users',
    icon: ImDatabase,
    url: '/all-users',
  },

  {
    name: 'Docs',
    icon: AiFillInfoCircle,
    url: 'https://web3js.readthedocs.io/en/v1.7.5/',
  },
];

export default menuItemData;
