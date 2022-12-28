import { useEffect, useState } from 'react';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';

import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

import { PassForm } from '@/Molecules/Forms/PassForm';
import {
  FormPassOptions,
  FormPassValues,
} from '@/Molecules/Forms/PassForm/type';

import { useAppSelector } from '@/redux/hooks';
import { deletePass, updatePass } from '@/services/Pass';
import { UpdatePass } from 'types/pass.type';
import { PassModal } from '@/Molecules/Modals/PassModal';

const options: FormPassOptions = {
  dropType: ['mint', 'premint', 'claim'],
  contractType: ['ERC721', 'ERC1155'],
};

type UpdatePassProps = {
  prevPage: () => void;
};

const EditPass = ({ prevPage }: UpdatePassProps) => {
  const [showModal, setShowModal] = useState(false);
  const [passId, setPassId] = useState<number>();
  const [initialValue, setInitialValue] = useState<FormPassValues>();
  const [updatedPassData, setUpdatedPassData] = useState<UpdatePass>();
  const prevPass = useAppSelector((state) => state.pass);

  useEffect(() => {
    const tempPrevPass = prevPass.pass;

    if (tempPrevPass) {
      const tempPassId = tempPrevPass.id;

      const tempInitialValue: FormPassValues = {
        title: tempPrevPass.title,
        dropType: tempPrevPass.dropType,
        contractType: tempPrevPass.contractType,
        contractAddress: tempPrevPass.contractAddress,
      };

      setPassId(tempPassId);
      setInitialValue(tempInitialValue);
    }
  }, [prevPass]);

  const formSubmitHandler = async (
    values: FormPassValues,
    { setSubmitting }: FormikHelpers<FormPassValues>,
  ) => {
    if (passId) {
      const tempPassData: UpdatePass = {
        title: values.title,
        dropType: values.dropType,
        contractType: values.contractType,
        contractAddress: values.contractAddress,
      };

      setUpdatedPassData(tempPassData);
      setShowModal(true);
      setSubmitting(false);
    }
  };

  const updatePassHandler = async () => {
    if (passId && updatedPassData) {
      updatePass(passId, updatedPassData)
        .then((response) => {
          const { message, data } = response;

          if (message === 'success') {
            const updatedPass = data.pass;
            setShowModal(false);
            toast.success('Pass Updated');
            prevPage();
          }
        })
        .catch((error) => {
          console.error('updatePass Error', error.message);
          toast.error('Pass Creation Error!');
        });
    }
  };

  const deletePassHandler = () => {
    if (passId) {
      deletePass(passId).then((response) => {
        const message = response.message;
        if (message === 'success') {
          toast.success('Pass Deleted');
          prevPage();
        }
      });
    }
  };

  return (
    <div className="flex justify-between px-2 py-5 sm:py-8 sm:px-0">
      <div className="form-container">
        {initialValue && (
          <PassForm
            formInitialValues={initialValue}
            formSubmitHandler={formSubmitHandler}
            options={options}
            formTitle="Update Pass:"
            buttonTitle="Update"
          />
        )}

        {showModal && updatedPassData && (
          <PassModal
            modalTitle="Update Pass"
            isModalOpen={showModal}
            passData={updatedPassData}
            handleCloseModal={() => setShowModal(false)}
            updatePass={updatePassHandler}
          />
        )}
      </div>

      <div className="flex-col hidden w-2/5 px-4 pt-3 md:flex sm:px-6 lg:px-8">
        <div>
          <Button
            onClick={deletePassHandler}
            bgColor="bg-black hover:bg-gray-700 border-transparent"
            padding="px-4 py-2"
            textProperties="text-white text-sm leading-4 text-gray-200"
            width="w-auto"
          >
            Delete Pass
          </Button>
          <p className="w-4/5 mt-2 text-sm font-medium font-Roboto">
            Read more about Passes
            <span className="pl-0.5 text-blue-500 cursor-pointer hover:underline">
              here
            </span>
            . You can later create Passes.
          </p>
        </div>

        <div className="mt-12">
          <div className="max-w-md font-Roboto">
            <Label className="text-2xl font-black">Your Pass name</Label>
            <p className="mt-1 text-sm">
              The Pass name is the main identifier for your contract and will
              appear anywhere your contract is mentioned. This is usually your
              artist name, brand, or identity.
            </p>
            <p className="mt-4 text-sm">
              This field accepts alpha numeric characters and spaces and can be
              any length.
            </p>

            <p className="mt-4 text-sm">
              We recommend less than 15 characters, however this is not a hard
              requirement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPass;
