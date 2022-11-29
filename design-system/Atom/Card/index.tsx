import React from 'react';
import { Button } from '../Button';
import { Image } from '../Image';
import { Label } from '../Label';

type NormalCardProps = {
  imgSrc: string;
  name: string;
  owner?: string;
  description?: string;
  onClick?: () => void;
};

export const Card = ({
  imgSrc,
  name,
  owner,
  description,
  onClick,
}: NormalCardProps) => {
  return (
    <div className="relative flex flex-col justify-between px-6 py-5 space-y-4 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer h-52 hover:shadow-lg">
      <div className="flex items-start h-full space-x-3">
        <div className="flex-shrink-0">
          <Image
            src={imgSrc}
            alt={name}
            className="rounded-md shadow-md h-14 w-14"
          ></Image>
        </div>

        <div>
          <Label className="font-bold text-gray-900 truncate text-md">
            {name}
          </Label>
          <h4 className="text-xs font-medium text-gray-900 truncate">
            {owner}
          </h4>
          <p className="mt-2 text-sm text-gray-500 line-clamp-3">
            {description?.slice(0, 80) + ' ...'}
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-end">
        <div className="flex-grow"></div>
        <Button
          bgColor="bg-black hover:bg-gray-700"
          display="self-end"
          textProperties="text-base font-medium text-white sm:text-sm"
          padding="px-4 py-2 sm:ml-3"
          width="sm:w-auto"
          onClick={onClick}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};
