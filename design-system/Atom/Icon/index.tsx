import React from 'react';

type IconProps = {
  icon: any;
  className?: string;
  title?: string;
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
