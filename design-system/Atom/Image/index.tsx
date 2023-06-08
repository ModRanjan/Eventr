import React from 'react';
interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
}

export const Image = ({ src, alt, ...props }: ImageProps) => {
  const { className, ...rest } = props;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={src} alt={alt} {...rest} />
  );
};
