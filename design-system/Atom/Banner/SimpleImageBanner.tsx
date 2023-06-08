import React from 'react';
import { Image } from '../Image';
import { Label } from '../Label';

interface SimpleImageBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}
export const SimpleImageBanner: React.FC<SimpleImageBannerProps> = ({
  imgSrc,
  children,
}) => {
  return (
    <div className="relative flex items-center justify-center h-screen min-h-fit">
      <Image
        src={imgSrc}
        alt={'banner'}
        className="fixed inset-0 object-cover object-center w-full h-full opacity-30"
      />

      {/* <div className="absolute inset-0 bg-[rgb(26,26,26)] mix-blend-darken bg-opacity-70" /> */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 bg-opacity-20 mix-blend-darken"
      />

      {/*
       * bg-slate-900
       * bg-[rgb(26,26,26)]
       * mix-blend-multiply
       * mix-blend-normal
       *
       * mix-blend-darken
       */}
      {/* </div> */}
      {children}
    </div>
  );
};
