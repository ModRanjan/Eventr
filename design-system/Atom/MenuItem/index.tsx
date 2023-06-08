import React from 'react';
import { Icon } from '../Icon';
import Link from 'next/link';
import { IconType } from 'react-icons';

type MenuItemProps = {
  active?: boolean;
  comingSoon?: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
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
  leftIcon,
  rightIcon,
  name,
  url,
  textProperties,
}: MenuItemProps) => {
  const className = [
    'border-b-2 hover:border-gray-300',
    active ? 'border-black text-black' : 'border-transparent',
    'cursor-pointer',
    comingSoon && 'text-gray-400',
    'inline-block',
    'h-full w-full',
    'inline-flex items-center gap-x-1',
    padding ? padding : 'px-1 pt-1',
    textProperties
      ? textProperties
      : 'text-sm md:text-lg text-gray-500 hover:text-gray-700',
  ].join(' ');

  return (
    <Link href={url}>
      <a className={customClasses || className}>
        {leftIcon && <Icon icon={leftIcon} className="w-5 h-5 mr-1" />}
        {name}
        {rightIcon && <Icon icon={rightIcon} className="w-5 h-5 ml-1" />}
      </a>
    </Link>
  );
};
