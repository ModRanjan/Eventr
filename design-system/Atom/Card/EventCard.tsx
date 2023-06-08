import React from 'react';

export interface Card1Type {
  cardColor?: string;
  titleProperty?: string;
  imgSrc: string;
  title: string;
  owner: string;
  date: number;
  month: string;
  onClick: () => void;
}

export const Card1 = ({
  cardColor,
  titleProperty,
  title,
  owner,
  imgSrc,
  date,
  month,
  onClick,
}: Card1Type) => {
  const CardBgColor = cardColor ?? 'bg-[#032055]';
  const CardTextColor = titleProperty ?? 'text-gray-200 font-semibold';
  console.log('description', owner);

  return (
    <div
      className={`relative block rounded-lg overflow-hidden cursor-pointer group ${CardBgColor}`}
      onClick={onClick}
    >
      <div
        aria-hidden="true"
        className="relative overflow-hidden rounded-t-lg aspect-w-3 aspect-h-2 group-hover:opacity-90 lg:aspect-w-5 lg:aspect-h-6"
      >
        <img
          src={imgSrc}
          alt={title}
          className="object-cover object-center w-full h-full transition-all duration-1000 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center w-12 h-[70px] text-white rounded-b-full gap-y-0 left-4 bg-gradient-to-bl from-pink-500 to-red-500">
        <span className="-mt-3 text-2xl"> {date}</span>
        <span className="text-sm">{month}</span>
      </div>

      <div className="px-4 font-OpenSans">
        <h3
          className={`text-xl sm:text-2xl mb-1 py-4 truncate capitalize ${CardTextColor} group-hover:text-[#31d7a9]`}
        >
          {title}
        </h3>

        <p className="py-3 text-base font-normal text-slate-200 overflow-hidden border-t border-[#31d7a9] border-dashed border-opacity-30">
          {'owner'}
        </p>
      </div>
    </div>
  );
};
