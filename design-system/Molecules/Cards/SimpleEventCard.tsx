import { useEffect, useState } from 'react';
import { BiTimeFive } from 'react-icons/bi';

import { Icon } from '@/Atoms/Icon';
import { Image } from '@/Atoms/Image';
import { Logo } from '@/Molecules/Logo';

type SimpleEventCardProps = {
  title: string;
  slug: string;
  description?: string;
  startDate: string;
  endDate: string;
  imgURL?: string;
  published?: boolean;
  onClick: (slug: string) => void;
};

export const SimpleEventCard = ({
  title,
  slug,
  description,
  startDate,
  endDate,
  published,
  onClick,
}: SimpleEventCardProps) => {
  const [cardDescription, setCardDescription] = useState<string | undefined>();
  const [startDateFormat, setStartDateFormat] = useState<string>();
  const [endDateFormat, setEndDateFormat] = useState<string>();

  useEffect(() => {
    let formatedStartDate = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'full',
    }).format(new Date(startDate));
    let formatedEndDate = new Date(endDate).toLocaleDateString('en-us', {
      day: 'numeric',
      year: 'numeric',
      month: 'short',
    });

    setStartDateFormat(formatedStartDate);
    setEndDateFormat(formatedEndDate);
  }, []);

  useEffect(() => {
    let tempDesc;

    if (description) {
      description.length > 80
        ? (tempDesc = description.slice(0, 80) + ' ...')
        : (tempDesc = description);
    }

    setCardDescription(tempDesc);
  }, [description]);
  return (
    <div
      onClick={() => onClick(slug)}
      className={`card group overflow-hidden min-h-fit bg-slate-100`}
    >
      <div>
        <Image
          src={'/images/card-bg.png'}
          alt={title}
          className={`object-cover object-bottom w-full  opacity-30 rounded-md relative `}
        />
      </div>

      <div className="absolute flex flex-col w-full">
        <div className="flex justify-between p-2 m-1 sm:p-4">
          <div className="min-w-0 pb">
            <h4 className="overflow-hidden text-xl font-bold sm:text-2xl overflow-ellipsis whitespace-nowrap">
              {title}
            </h4>
          </div>
          <div className="flex items-center self-start justify-between flex-none shrink-0">
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {published ? 'Publihed' : 'Draft'}
            </span>
            <Logo className="block w-auto h-8 ml-2 opacity-100" />
          </div>
        </div>

        <div className="flex justify-center w-full border-t border-gray-400" />

        <div className="flex flex-col justify-center w-full h-[88px] p-3 mt-1 sm:p-4">
          <div className="text-xs font-black text-gray-500 uppercase">
            Description
          </div>
          <h2 className="text-lg font-medium leading-6">{cardDescription}</h2>
        </div>

        <div className="flex justify-center w-full border-t border-gray-400" />

        <div className="flex items-center p-3 mb-1 sm:px-4">
          <Icon icon={BiTimeFive} className="mr-1.5" />
          <p className="text-sm font-medium">
            {`${startDateFormat} - ${endDateFormat}`}
          </p>
        </div>
      </div>
    </div>
  );
};
