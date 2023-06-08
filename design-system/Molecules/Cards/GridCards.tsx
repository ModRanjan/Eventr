import React from 'react';

import { Card1 } from '@/Atoms/Card/EventCard';

import { IDeployedEvent } from '@/redux/event/types';

type EventsTwoType = {
  cardData?: IDeployedEvent[];
  maxLimit: number;
  onClickCardHandler: (Id: number | string) => void;
};

export const GridCards = ({
  cardData,
  maxLimit,
  onClickCardHandler,
}: EventsTwoType) => {
  console.log('maxLimit: ', maxLimit);
  return (
    <div className="grid grid-cols-1 px-4 gap-x-10 gap-y-8 sm:grid-cols-3 sm:gap-x-10 sm:px-0">
      {cardData &&
        cardData.map(
          (data, index) =>
            maxLimit > index && (
              <Card1
                onClick={() => onClickCardHandler(data.eventId)}
                key={data.eventName + index}
                title={data.eventName}
                owner={data.ownerAddress}
                imgSrc={data.coverURL}
                cardColor={'bg-[#032055]'}
                date={23}
                month={'Dec'}
                titleProperty={'text-gray-200 font-semibold'}
              />
            ),
        )}
    </div>
  );
};
