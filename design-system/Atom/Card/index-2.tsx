import { FC } from 'react';

import { Button } from '@/Atoms/Button';
import { Image } from '@/Atoms/Image';
import { IconType } from 'react-icons';

interface CardProps {
  imgSrc: string;
  title: string;
  buttonTitle: string;
  price: number;
  currencySymbool: string;
  // onClick?: (Id?: string | number) => void;
  onClick?: () => void;
}

export const Card2: FC<CardProps> = ({
  buttonTitle,
  currencySymbool,
  imgSrc,
  price,
  title,
  onClick,
}) => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl h-96">
      <div className="relative">
        <Image
          className="absolute inset-0 w-full rounded-3xl h-96"
          src={imgSrc}
          alt={title}
        />
      </div>

      <div className="absolute inset-0 z-10 px-4 py-4 sm:py-6">
        <div className="absolute top-0 w-12 h-20 overflow-hidden bg-pink-500 right-8 ">
          <p className="my-4 text-white">HOT</p>
          <div className="w-12 h-12 mt-6 rotate-45 bg-white"></div>
        </div>

        <Image
          src={'/images/ticket/icon/ticket01.png'}
          alt="ticket-icon"
          className="w-20 h-20 mx-auto "
        />
        <h1 className="mb-2 text-xl text-gray-800">{title}</h1>

        <div className="mb-4 text-indigo-600">
          <span className=""> {currencySymbool}</span>
          <span className="ml-1 text-4xl sm:text-6xl">{price}</span>
        </div>

        <hr className="my-5 mt-12 border border-gray-200"></hr>

        <Button
          onClick={onClick}
          customClasses="uppercase text-white whitespace-nowrap text-base rounded-3xl bg-gradient-to-r from-red-500 via-purple-600 to-indigo-600 px-4 sm:px-8 py-3"
        >
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};
