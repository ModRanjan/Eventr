import React from 'react';

import { NftCard } from '@/Atoms/Card/NftCard';

import { IDeployedEvent } from '@/redux/event/types';

interface NFTsType {
  allEvents?: IDeployedEvent[];
  className: string;
  onClickCardHandler: (ID: number | string) => void;
}

export const NftsCards = ({
  allEvents,
  className,
  onClickCardHandler,
}: NFTsType) => {
  return (
    <div className={className}>
      {allEvents &&
        allEvents.map((item, index) => {
          return (
            index < 9 && (
              <NftCard
                onClick={() => onClickCardHandler(item.eventId)}
                key={item.eventName + index}
                imgSrc={item.coverURL}
                name={item.eventName}
                description={item.description}
              />
            )
          );
        })}
    </div>
  );
};
