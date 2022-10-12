import React from 'react';
import { Icon } from '../Icon';
import Link from 'next/link';
type MenuItemProps={
  icon: any;
  name: string;
  active?:boolean;
  url: string;
  comingSoon?:boolean;
}
export const MenuItem = ({ icon, name, active, url, comingSoon }:MenuItemProps) => {
  return (
    <Link href={url}>
      <li
        className={`flex  items-center space-x-1 cursor-pointer  ${
          comingSoon && 'text-gray-400'
        }`}
      >
        <Icon icon={icon} className={''}/>
        <span className={`${active && 'text-blue-800'} `}>{name}</span>
      </li>
    </Link>
  );
};
