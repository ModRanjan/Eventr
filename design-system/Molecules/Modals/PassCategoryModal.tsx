import { Button } from '@/Atoms/Button';
import { Icon } from '@/Atoms/Icon';
import { Label } from '@/Atoms/Label';
import { CustomModal } from '@/Atoms/Modal/CustomModal';
import { BiRupee } from 'react-icons/bi';

import { HiOutlineXCircle } from 'react-icons/hi';
import { CreatePassCategory, UpdatePassCategory } from 'types/passCategory';
type PassCategoryModalProps = {
  modalTitle: string;
  isModalOpen: boolean;
  passCategoryData: CreatePassCategory | UpdatePassCategory;
  handleCloseModal: () => void;
  createPassCategory?: () => void;
  updatePassCategory?: () => void;
};

export const PassCategoryModal = ({
  modalTitle,
  isModalOpen,
  handleCloseModal,
  passCategoryData,
  createPassCategory,
  updatePassCategory,
}: PassCategoryModalProps) => {
  const onCreateUpdateHandler = () => {
    if (createPassCategory) createPassCategory();

    if (updatePassCategory) updatePassCategory();
  };

  return (
    <CustomModal
      open={isModalOpen}
      handleCloseModal={handleCloseModal}
      label={modalTitle}
      width="sm:max-w-md w-full max-w-sm"
      height="h-fit"
    >
      <Label className="flex justify-between w-full pb-2 text-3xl font-medium text-left border-b border-gray-400 sm:px-4 lg:px-8">
        <h3 className="flex text-lg font-Roboto md:text-xl">
          Review Pass Category Details
        </h3>

        <Button
          onClick={handleCloseModal}
          type="button"
          bgColor="border-0"
          padding="px-0 py-0"
          textProperties="text-sm text-gray-500 hover:text-gray-900"
          width="w-fit"
        >
          <Icon className="h-6 w-9" icon={HiOutlineXCircle} />
        </Button>
      </Label>

      <div className="block w-full px-6 py-5 mb-3 overflow-y-auto sm:px-8 max-h-72">
        <div className="flex flex-col justify-center w-full space-y-3">
          <div className="flex flex-col flex-1">
            <span className="text-xs font-medium uppercase">
              Pass Category Name
            </span>

            <span className="text-base text-gray-500">
              {passCategoryData.title}
            </span>
          </div>

          <div className="flex flex-col flex-1">
            <span className="text-xs font-medium uppercase">
              numberOfTokens
            </span>

            <span className="text-base text-gray-500">
              {passCategoryData.numberOfTokens}
            </span>
          </div>

          <div className="flex flex-col flex-1">
            <span className="text-xs font-medium uppercase">Price</span>

            <span className="text-base text-gray-500">
              <Icon icon={BiRupee} className="inline-block h-auto mr-1"></Icon>
              {passCategoryData.price}
            </span>
          </div>

          <div className="flex flex-col flex-1">
            <span
              className="text-xs font-medium uppercase"
              title={passCategoryData?.tokenId?.toString()}
            >
              Token Id
            </span>

            <span className="text-base text-gray-500">
              {passCategoryData.tokenId ?? 'no token id'}
            </span>
          </div>
        </div>
      </div>

      <Button
        type="button"
        onClick={onCreateUpdateHandler}
        bgColor="bg-black hover:bg-gray-700"
        display="inline-flex justify-self-end"
        padding="px-3 py-2.5 ml-auto mr-4 lg:mr-8"
        textProperties="text-sm text-white leading-4"
        width="w-fit"
      >
        {modalTitle}
      </Button>
    </CustomModal>
  );
};
