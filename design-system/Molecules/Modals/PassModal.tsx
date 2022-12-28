import { Button } from '@/Atoms/Button';
import { Icon } from '@/Atoms/Icon';
import { Label } from '@/Atoms/Label';
import { CustomModal } from '@/Atoms/Modal/CustomModal';
import { HiOutlineXCircle } from 'react-icons/hi';
import { UpdatePass } from 'types/pass.type';

type PassModalProps = {
  handleCloseModal: () => void;
  isModalOpen: boolean;
  modalTitle: string;
  passData: UpdatePass;
  createPass?: () => void;
  updatePass?: () => void;
};

export const PassModal = ({
  modalTitle,
  passData,
  handleCloseModal,
  isModalOpen,
  createPass,
  updatePass,
}: PassModalProps) => {
  const onCreateUpdateHandler = () => {
    if (createPass) createPass();

    if (updatePass) updatePass();
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
        <h3 className="flex text-lg font-Roboto md:text-xl">
          Review Pass Details
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
        <div className="flex flex-col justify-center w-full space-y-6">
          <div className="flex flex-col flex-1">
            <span className="text-xs font-medium uppercase">Pass Name</span>

            <span className="text-base text-gray-500">{passData.title}</span>
          </div>
          <div className="flex justify-between gap-x-3">
            <div className="flex flex-col flex-1">
              <span className="text-xs font-medium uppercase">Pass Type</span>

              <span className="text-base text-gray-500">
                {passData.dropType}
              </span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-xs font-medium uppercase">
                Contract Type
              </span>

              <span className="text-base text-gray-500">
                {passData.contractType}
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <span
              className="text-xs font-medium uppercase"
              title={passData.contractAddress}
            >
              type
            </span>

            <span className="text-base text-gray-500">
              {passData.contractAddress}
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
