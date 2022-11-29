import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Image } from '../Image';
import { Icon } from '../Icon';
type DropdownProps = {
  name: string;
  dropdownOnClick?: () => void;
  imgSrc?: string;
  disabled?: boolean;
  dropdownRef?: any;
};
export const Dropdown = ({
  name,
  dropdownOnClick,
  imgSrc,
  disabled,
  dropdownRef,
}: DropdownProps) => {
  const className = [
    'bg-white',
    'border border-gray-300',
    'cursor-pointer',
    'font-medium',
    'hover:bg-gray-50',
    'relative inline-flex justify-center items-center',
    'mx-auto',
    'px-2.5 py-1.5',
    'rounded-md',
    'shadow-sm',
    'text-xs text-gray-700',
    'w-full',
    disabled ? 'disabled ' : null,
  ].join(' ');

  return (
    <button
      ref={dropdownRef}
      className={className}
      disabled={disabled}
      onClick={dropdownOnClick}
    >
      {imgSrc && (
        <Image src={imgSrc} alt={'-'} className={'w-4  my-1.5 lg:m-1.5'} />
      )}

      {name}

      <Icon icon={FiChevronDown} className=" mx-1" />
    </button>
  );
};
