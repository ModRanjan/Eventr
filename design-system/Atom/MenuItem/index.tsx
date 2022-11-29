import React from 'react';
import { Icon } from '../Icon';
import Link from 'next/link';

type MenuItemProps = {
  active?: boolean;
  comingSoon?: boolean;
  icon?: any;
  customClasses?: string;
  padding?: string;
  name: string;
  textProperties?: string;
  url: string;
};

export const MenuItem = ({
  active,
  comingSoon,
  customClasses,
  padding,
  icon,
  name,
  url,
  textProperties,
}: MenuItemProps) => {
  const className = [
    active && 'border-black text-black',
    'border-b-2 border-transparent hover:border-gray-300',
    'cursor-pointer',
    comingSoon && 'text-gray-400',
    'font-normal ',
    'inline-flex items-center gap-x-1',
    padding ? padding : 'px-1 pt-1',
    textProperties
      ? textProperties
      : 'text-sm md:text-lg text-gray-500 hover:text-gray-700',
  ].join(' ');

  return (
    <Link href={url}>
      <li className={customClasses || className}>
        {icon && <Icon icon={icon} className="mr-2" />}
        {name}
      </li>
    </Link>
  );
};
