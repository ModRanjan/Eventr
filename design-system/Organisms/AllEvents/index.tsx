import { Card } from '@/Atoms/Card';

import { nftsData } from '@/config/nftsData';
import Router from 'next/router';

export const AllEvents = () => {
  const eventDetail = (data: string) => {
    Router.push('/Events/' + data);
  };

  return (
    <div className="z-20 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {nftsData.map((item, index) => {
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
