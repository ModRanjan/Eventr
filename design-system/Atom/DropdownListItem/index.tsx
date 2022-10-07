import React from 'react';
import { Image } from '../Image';
import {IChainData} from "../../../redux/reducer/data.type"
type PropsType={
  onClickDropdownItem:(data:IChainData|any)=>void;
  imgSrc:string;
  name:string;
}
export const DropdownListItem = ({ onClickDropdownItem, imgSrc, name }:PropsType) => {
  const className = [
    'flex  items-center',
    'px-4',
    'h-10  w-full',
    'rounded-lg',
    'text-gray-900',
    'hover:bg-gray-200',
    'cursor-pointer',
  ].join(' ');

  return (
    <div onClick={onClickDropdownItem} className={className}>
      <span className=" my-1.5 lg:m-1.5 ">
        <Image src={imgSrc} alt={'$'} className={' w-5 h-4'} />
      </span>
      <span className="ml-3 font-medium ">{name}</span>
    </div>
  );
};
