import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  props?: React.Attributes;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  );
};
