import { NftCard } from '@/Atoms/Card/NftCard';
import { nftsData } from '@/config/nftsData';

const Nfts = () => {
  return (
    <div className="flex w-auto gap-4 px-2 pb-12 overflow-x-scroll sm:px-12">
      {nftsData.map((item, index) => {
        return (
          index < 9 && (
            <NftCard
              key={item.name + index}
              imgSrc={item.imgSrc}
              name={item.name}
              description={item.description}
            />
          )
        );
      })}
    </div>
  );
};

export default Nfts;
