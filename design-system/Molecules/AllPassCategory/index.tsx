import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HiSortAscending, HiOutlineSelector } from 'react-icons/hi';

import { Icon } from '@/Atoms/Icon';
import { Button } from '@/Atoms/Button';

import { Table } from '@/Molecules/Table';
import { NoRecord } from '@/Molecules/NoRecord';
import { PassCategoryModal } from '@/Molecules/Modals/PassCategoryModal';

import { useAppDispatch } from '@/redux/hooks';
import { PassCategory } from '@/redux/passCategory/type';
import { setCurrentPassCategory } from '@/redux/passCategory/passCategorySlice';

type PassDetailsProps = {
  createPassCategory?: () => void;
  allPassCategories: PassCategoryTableRows[];
  columns: PassCategoryTableColumns[];
};

export interface PassCategoryTableColumns {
  heading: string;
  value: string;
}

export interface PassCategoryTableRows {
  sNo: number;
  id: number;
  title: string;
  slug: string;
  tokenId: number | null;
  numberOfTokens: number;
  price: number;
  edit: JSX.Element;
}

const PassDetails = ({
  allPassCategories,
  columns,
  createPassCategory,
}: PassDetailsProps) => {
  const dispatch = useAppDispatch();

  const showPassDetailModel = async (values: PassCategoryTableRows) => {
    if (values) {
      const tempPassCategory: PassCategory = {
        id: values.id,
        title: values.title,
        slug: values.slug,
        tokenId: values.tokenId,
        numberOfTokens: values.numberOfTokens,
        price: values.price,
      };

      dispatch(setCurrentPassCategory(tempPassCategory));
    }
  };

  if (allPassCategories.length < 1) {
    return (
      <NoRecord
        buttonTitle="Create Pass Token"
        message="Sorry! You have no pass-tokens"
        onClick={createPassCategory}
      />
    );
  }

  return (
    <div className="flex flex-col justify-between w-full my-4 sm:my-5">
      <Table
        columns={columns}
        rows={allPassCategories}
        onClickRow={showPassDetailModel}
        itemsPerPage={9}
      />
    </div>
  );
};

export default PassDetails;
{
  /* <div className="flex items-center justify-between w-full my-4 sm:my-3">
    <div className="flex flex-col justify-start w-full sm:flex-row sm:items-center">
      <div className="w-full mt-2 sm:mt-0 sm:w-80">
        <div className="flex w-full rounded-md shadow-sm">
          <Button customClasses="flex-none -mr-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-l-md bg-gray-50 hover:bg-gray-100">
            <Icon
              className="w-5 h-5 text-gray-600"
              icon={HiSortAscending}
            />
            <span>Sort by</span>
          </Button>

          <div className="w-full">
            <div className="relative">
              <Button
                type="button"
                customClasses="bg-white relative w-full border border-gray-300 rounded-none rounded-r-md shadow-sm pl-3 pr-10 py-2 text-left text-sm"
              >
                <span className="block truncate">Title Ascending</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Icon
                    className="w-5 h-5 text-gray-600"
                    icon={HiOutlineSelector}
                  />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */
}
