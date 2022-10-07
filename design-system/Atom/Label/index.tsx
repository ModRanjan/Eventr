import React from 'react';
type LabelProps={
  children:React.ReactNode |string;
  className?:string;
  onHoverTitle?: string;
}
export const Label = ({ children, className, onHoverTitle }:LabelProps) => {
  return (
    <div className={className} title={onHoverTitle}>
      {children}
    </div>
  );
};
