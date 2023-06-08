import { useEffect, useState } from 'react';

import { Label } from '@/Atoms/Label';
import { PassCategoryCard } from '@/Molecules/Cards/PassCategoryCard';

import getCollctionIds from '@/flow/scripts/get_collection_Ids';
import getTokenMetadata from '@/flow/scripts/get_token_metadata';

type toknDataType = {
  categoryID: string;
  dateOfToken: string;
  eventID: string;
  eventName: string;
  numTokensInPass: string;
  passCategoryName: string;
  passID: string;
  passName: string;
  passType: string;
};

const PassCards = () => {
  const [tokenData, setTokenData] = useState([]);

  useEffect(() => {
    const address = '0x2ccc2a8f0a17a446';
    const getAccountTokenIDs = async () => {
      try {
        const transaction = await getCollctionIds(address);
        try {
          console.log('token IDs: ', transaction);
          const tempTokenData: toknDataType[] = [];

          if (Array.isArray(transaction)) {
            let count = 1;

            transaction.map(async (item) => {
              const data = await getTokenMetadata(address, item);
              console.log(data);
              tempTokenData.push({ ...data });
            });
          }
          console.log(tempTokenData);
        } catch (error) {
          console.log('get token metadata error', error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAccountTokenIDs();
  });
  return (
    <div className="px-4 py-5 space-y-4 sm:py-6 sm:px-0">
      <Label className="sm:px-6 lg:px-8">
        <h3 className="section-title">Your Passes</h3>
      </Label>

      <div className="max-w-4xl mx-auto overflow-hidden bg-white sm:px-6 lg:px-8">
        <div className="flex flex-col gap-y-4">
          <PassCategoryCard passType="normal" price={199} title="silver" />

          <PassCategoryCard passType="gold" price={649} title="gold" />

          <PassCategoryCard passType="mint" price={399} title="platinum" />
        </div>
      </div>
    </div>
  );
};

export default PassCards;
