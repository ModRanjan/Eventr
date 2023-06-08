import React, { useCallback, useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { HiOutlineXCircle } from 'react-icons/hi';

import { Icon } from '@/Atoms/Icon';
import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';
import { CustomModal } from '@/Atoms/Modal/CustomModal';

import Token from '@/Molecules/EventTokens/Token';
import { CategoryDataType } from '@/Organisms/Deployed/EventDetail';

type PurchaseModalProps = {
  categoriesData: CategoryDataType[];
  isModalOpen: boolean;
  modalTitle: string;
  handleCloseModal(): void;
  getCategoriesData(Value: CategoryDataType[]): void;
};

export const MultipleTokenPurchaseModal = ({
  handleCloseModal,
  isModalOpen,
  modalTitle,
  categoriesData,
  getCategoriesData,
}: PurchaseModalProps) => {
  const [payableValue, setPayableValue] = useState(0);
  const [choosenCategories, setChoosenCategories] =
    useState<CategoryDataType[]>(categoriesData);

  const onTokenChange = useCallback(
    (categoryID: string, price: number, isIncrement: boolean) => {
      const updatedPaybleValue: number = isIncrement
        ? payableValue + price
        : payableValue - price;

      const updatedCategories = choosenCategories.map(
        (item: CategoryDataType) =>
          item.categoryID === categoryID
            ? {
                ...item,
                choosenQuantity:
                  Number(item.choosenQuantity) + (isIncrement ? 1 : -1),
              }
            : item,
      );

      setChoosenCategories(updatedCategories);
      setPayableValue(updatedPaybleValue);
    },
    [choosenCategories, payableValue],
  );

  const NextButtonHandler = () => {
    handleCloseModal();
    getCategoriesData(choosenCategories);
  };

  return (
    <CustomModal
      open={isModalOpen}
      handleCloseModal={handleCloseModal}
      label={modalTitle}
      width="sm:max-w-xl w-full max-w-sm"
      height="h-fit"
    >
      <Label className="flex justify-between w-full pb-2 text-3xl font-medium text-left border-b border-gray-400 sm:px-4 lg:px-8">
        <h3 className="flex text-lg font-Roboto md:text-xl">Select Tokens</h3>

        <Button
          onClick={handleCloseModal}
          type="button"
          bgColor="border-0"
          padding="px-0 py-0 -mr-1"
          textProperties="text-sm text-gray-500 hover:text-gray-900"
          width="w-fit"
        >
          <Icon className="h-6 w-9" icon={HiOutlineXCircle} />
        </Button>
      </Label>

      <div className="flex items-center justify-between w-full mt-3 sm:px-4 lg:px-8">
        <p className="w-full text-base font-medium">Token Types</p>
        <div className="flex flex-1" />
        <p className="text-base font-medium w-fit">Quantity</p>
      </div>

      <div className="block w-full py-4 mb-3 overflow-y-auto sm:px-4 max-h-72">
        <div className="flex flex-col justify-center w-full space-y-6">
          {categoriesData.map((category: CategoryDataType) => {
            return (
              <Token
                key={category.categoryID}
                tokenData={category}
                onTokenChange={onTokenChange}
              />
            );
          })}
        </div>
      </div>

      <div className="flex justify-between w-full pl-6 sm:pl-8">
        <p className="text-base">
          Total: <span className="">{payableValue} flow token</span>
        </p>
        <Button
          type="button"
          onClick={NextButtonHandler}
          bgColor="bg-black hover:bg-gray-700"
          display="inline-flex justify-self-end items-center"
          padding="px-3 py-2.5 ml-auto mr-4 lg:mr-8"
          textProperties="text-sm text-white leading-4"
          width="w-fit"
        >
          Next
          <Icon icon={AiOutlineRight} className="w-5 text-white" />
        </Button>
      </div>
    </CustomModal>
  );
};
