import Link from 'next/link';

import { Spinner } from '../Spinner';

type ButtonProps = {
  bgColor?: string;
  children: React.ReactNode | string;
  customClasses?: string;
  disabled?: boolean;
  display?: string;
  link?: string;
  loading?: boolean;
  onClick?: () => void;
  padding?: string;
  rounded?: string;
  textProperties?: string;
  type?: 'submit' | 'reset' | 'button' | undefined; // React.ButtonHTMLAttributes<HTMLAttributes>;
  width?: string;
};

export const Button = ({
  bgColor,
  children,
  customClasses,
  disabled,
  display,
  link,
  loading,
  onClick,
  padding,
  rounded,
  textProperties,
  type,
  width,
}: ButtonProps) => {
  const className = [
    bgColor ? bgColor : 'bg-white hover:bg-gray-300',
    'border border-gray-300',
    'font-medium',
    'focus:outline-none',
    'focus:z-10',
    'focus:ring-2 focus:ring-offset-2 focus:ring-black',
    display ? display : 'relative inline-flex items-center justify-center',
    padding ? padding : 'px-2.5 py-1.5 mx-auto',
    rounded ? rounded : 'rounded-md',
    'shadow-sm',
    textProperties ? textProperties : 'whitespace-nowrap text-sm text-black',
    width ? width : 'w-full',
    'whitespace-nowrap',
    disabled || loading
      ? 'disabled cursor-not-allowed disabled:opacity-50'
      : 'cursor-pointer',
    'transition-colors duration-300 ease-in-out',
  ].join(' ');

  return link ? (
    <Link href={link}>
      <button
        className={customClasses || className}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </Link>
  ) : (
    <button
      type={type}
      className={customClasses || className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}

      {loading && <Spinner />}
    </button>
  );
};
