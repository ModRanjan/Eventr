import { useState } from 'react';
import { BsPlusLg, BsDashLg } from 'react-icons/bs';

import { Icon } from '@/Atoms/Icon';
import { Button } from '@/Atoms/Button';
import { CategoryDataType } from '../../Organisms/Deployed/EventDetails';

type TokenPropsType = {
  tokenData: CategoryDataType;
  onTokenChange: (
    categoryId: string,
    price: number,
    isIncrement: boolean,
  ) => void;
};

const Token = ({ tokenData, onTokenChange }: TokenPropsType) => {
  const [numberOfTokens, setNumberOfTokens] = useState(0);

  const incrementToken = () => {
    const tempNumberOfTokens = numberOfTokens + 1;
    if (tempNumberOfTokens <= Number(tokenData.maxEditions)) {
      setNumberOfTokens(tempNumberOfTokens);
      onTokenChange(tokenData.categoryID, Number(tokenData.price), true);
    }
  };

  const decrementToken = () => {
    const tempNumberOfTokens = numberOfTokens - 1;
    if (tempNumberOfTokens >= 0) {
      setNumberOfTokens(tempNumberOfTokens);
      onTokenChange(tokenData.categoryID, Number(tokenData.price), false);
    }
  };

  return (
    <div className="flex w-full hover:bg-slate-200">
      <span
        className={`rounded-l-md w-2 ${
          numberOfTokens > 0 ? 'bg-green-500' : ''
        }`}
      />

      <div className="flex flex-col w-full py-2 pl-2">
        <p className="mb-1 -mt-1 text-lg font-medium capitalize">
          {tokenData.categoryName}
        </p>

        <p className="text-base font-medium">
          Price:
          <span className="px-2 text-lg">
            {Number(tokenData.price) * numberOfTokens}
          </span>
          FLOW
          <span className="ml-2 text-sm">({tokenData.price} FLOW/ token)</span>
        </p>

        <p className="mt-1 text-sm font-medium">
          Token Left:
          <span className="pl-2 text-base font-normal">
            {Number(tokenData.maxEditions) - numberOfTokens}/
            {tokenData.maxEditions}
          </span>
        </p>

        <p className="mt-4 text-sm font-normal">
          The price is as per Token Including
        </p>
      </div>

      <div className="flex items-center px-2 gap-x-2">
        <Button
          customClasses="p-2 rounded-full border border-gray-500 hover:border-black"
          onClick={decrementToken}
        >
          <Icon icon={BsDashLg} className="w-4 h-4 rounded-full " />
        </Button>

        <p className="text-lg">{numberOfTokens}</p>

        <Button
          customClasses="p-2 rounded-full border border-gray-500 hover:border-black"
          onClick={incrementToken}
        >
          <Icon icon={BsPlusLg} className="w-4 h-4 rounded-full " />
        </Button>
      </div>
    </div>
  );
};

export default Token;
