import React, { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import { BiMenu, BiX } from 'react-icons/bi';

type IconProps = {
  icon: IconType;
  className?: string;
  title?: string;
  onClick?: () => void;
};

export const Icon = ({ icon, className, title }: IconProps) => {
  const IconName = icon;

  return (
    <IconName
      className={className}
      title={title}
      style={{ verticalAlign: 'middle' }}
    />
  );
};

type MenuIconPropsType = {
  isMenueOpen: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const MenuIcon = ({
  className,
  isMenueOpen,
  onClick,
}: MenuIconPropsType) => {
  const Icon = isMenueOpen ? BiX : BiMenu;

  return (
    <button className={className} onClick={onClick}>
      <Icon className="w-9 h-9" />
    </button>
  );
};
