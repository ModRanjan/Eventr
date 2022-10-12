import React from 'react'
type ImageProps={
    src: string;
    alt? : string;
    className: string;
    onClick?:()=>void;
  }
  export const Image=({src,alt,className,onClick}:ImageProps)=> {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={src} alt={alt} onClick={onClick} />
  )
}

 