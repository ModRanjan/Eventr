import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { Spinner } from '../Spinner';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  bgColor?: string;
  border?: string;
  children: React.ReactNode | string;
  customClasses?: string;
  disabled?: boolean;
  display?: string;
  link?: string;
  loading?: boolean;
  padding?: string;
  rounded?: string;
  textProperties?: string;
  width?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      bgColor,
      border,
      children,
      customClasses,
      disabled,
      display,
      link,
      loading,
      padding,
      rounded,
      textProperties,
      width,
      ...props
    },
    ref,
  ) => {
    const className = [
      bgColor ? bgColor : 'bg-white hover:bg-gray-300',
      border ? border : 'border border-gray-600',
      'font-medium',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black',
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
          disabled={disabled || loading}
          {...props}
          ref={ref}
        >
          {children}
        </button>
      </Link>
    ) : (
      <button
        className={customClasses || className}
        disabled={disabled || loading}
        {...props}
        ref={ref}
      >
        {children}

        {loading ? (
          <Spinner className="inline-block w-4 h-4 ml-2 animate-spin" />
        ) : null}
      </button>
    );
  },
);

Button.displayName = 'Button';

// interface ButtonProps
//   extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
//   className?: string;
//   href?: string;
//   [key: string]: any; // to get additional props
// }

// export const Button: FC<ButtonProps> = ({ className, href, ...props }) => {
//   return href ? (
//     <Link passHref href={href} legacyBehavior>
//       <a className={className} {...props} />
//     </Link>
//   ) : (
//     <button className={className} {...props} />
//   );
// };
