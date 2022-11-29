import { Card } from '@/Atoms/Card';

import { NftsData } from '@/config/nftsData';
import Router from 'next/router';

export const AllEvents = () => {
  const eventDetail = (data: string) => {
    Router.push('/Events/' + data);
  };

  return (
    <div className="z-20 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {NftsData.map((item, index) => {
        return (
          <Card
            onClick={() => eventDetail(item.name)}
            key={index}
            imgSrc={item.imgSrc}
            name={item.name}
            owner={item.owner}
            description={item.description}
          />
        );
      })}
    </div>
  );
};
