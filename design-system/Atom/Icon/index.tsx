import React from 'react';
type IconProps={
  icon:any;
  className?:string;
}
export const Icon = ({ icon, className }:IconProps) => {
  const IconName= icon;

  return <IconName className={className} />;
};
