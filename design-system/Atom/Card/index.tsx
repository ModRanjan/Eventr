import { useEffect, useState } from 'react';
import { Logo } from '@/Molecules/Logo';

import { Image } from '../Image';
import { Label } from '../Label';

type CardProps = {
  title: string;
  slug: string;
  description?: string;
  startDate: string;
  endDate: string;
  profileURL?: string;
  onClick: (slug: string) => void;
};

export const Card = ({
  profileURL,
  slug,
  description,
  startDate,
  endDate,
  title,
  onClick,
}: CardProps) => {
  const [cardDescription, setCardDescription] = useState<string | undefined>();
  const [startDateFormat, setStartDateFormat] = useState<string>();
  const [endDateFormat, setEndDateFormat] = useState<string>();

  useEffect(() => {
    let formatedStartDate = new Date(startDate).toDateString();
    let formatedEndDate = new Date(endDate).toDateString();

    setStartDateFormat(formatedStartDate);
    setEndDateFormat(formatedEndDate);
  }, []);

  useEffect(() => {
    let tempDesc;

    if (description) {
      description.length > 80
        ? (tempDesc = description.slice(0, 70) + ' ...')
        : (tempDesc = description);
    }

    setCardDescription(tempDesc);
  }, [description]);

  return (
    <div onClick={() => onClick(slug)} className={`card group overflow-hidden`}>
      <div>
        <Image
          src={'/images/card-bg.png'}
          alt={title}
          className={`object-cover object-center h-full opacity-25 rounded-md relative bg-gradient-to-tr from-gray-300 to-slate-300`}
        />
      </div>

      <div className="absolute w-full px-4 py-5 space-y-8">
        <div className="flex items-start h-full space-x-3">
          <div className="flex-shrink-0">
            {profileURL ? (
              <Image
                src={profileURL}
                alt={title}
                className="w-20 h-20 rounded-md shadow-lg shadow-slate-200"
              />
            ) : (
              <span className="block w-20 h-20 rounded-md shadow-lg bg-gradient-to-r from-gray-200 to-slate-200 shadow-slate-200" />
            )}
          </div>

          <div className="w-full h-20 overflow-hidden">
            <Label className="-mt-0.5 font-bold text-gray-900 capitalize truncate text-md">
              {title}

              <Logo className="inline-block float-right ml-auto h-7" />
            </Label>

            <p className="mt-1 text-sm leading-4 text-gray-500 line-clamp-3">
              {description && cardDescription}
            </p>
          </div>
        </div>

        <div className="flex justify-center space-x-3">
          <div className="w-full p-2 px-3 bg-gray-100 rounded-md line-clamp-2">
            <h2 className="text-xs font-bold uppercase">Start Date</h2>
            <span className="mt-1 text-sm text-gray-500 whitespace-nowrap">
              {startDateFormat}
            </span>
          </div>

          <div className="w-full p-2 px-3 bg-gray-100 rounded-md line-clamp-2">
            <h2 className="text-xs font-bold uppercase">End Date</h2>
            <span className="mt-1 text-sm text-gray-500 whitespace-nowrap ">
              {endDateFormat}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
