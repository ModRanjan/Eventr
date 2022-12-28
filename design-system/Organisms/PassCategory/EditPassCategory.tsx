import { useEffect, useState } from 'react';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';

import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

import { PassCategoryForm } from '@/Molecules/Forms/PassCategoryForm';
import { PassCategoryModal } from '@/Molecules/Modals/PassCategoryModal';
import { FormPassCategoryValues } from '@/Molecules/Forms/PassCategoryForm/type';

import { useAppSelector } from '@/redux/hooks';
import { UpdatePassCategory } from 'types/passCategory';
import {
  deletePassCategory,
  updatePassCategory,
} from '@/services/PassCategory';
import { useRouter } from 'next/router';
import { ROUTES } from '@/config/routes';

type EditPassCategoryProps = {
  prevPage: () => void;
};

const EditPassCategory = ({ prevPage }: EditPassCategoryProps) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [passCategoryId, setPassCategoryId] = useState<number>();
  const [currentPassCategory, setCurrentPassCategory] =
    useState<UpdatePassCategory>();
  const [currentContractType, setCurrentContractType] = useState<
    'ERC721' | 'ERC1155'
  >('ERC721');
  const [initialValue, setInitialValue] = useState<FormPassCategoryValues>();
  const currentPassDetail = useAppSelector((state) => state.pass);
  const passCategoryDetail = useAppSelector(
    (state) => state.passCategory.currentPassCategory,
  );

  useEffect(() => {
    const tempCurrentPass = currentPassDetail.pass;

    const tempConteractType = tempCurrentPass?.contractType;

    if (tempConteractType) {
      setCurrentContractType(tempConteractType);
    }
  }, [currentPassDetail]);

  useEffect(() => {
    const tempPassCategoryDetail = passCategoryDetail;

    if (tempPassCategoryDetail) {
      const tempPassCategoryId = passCategoryDetail.id;

      const tempFormValues: FormPassCategoryValues = {
        title: tempPassCategoryDetail.title,
        numberOfTokens: tempPassCategoryDetail.numberOfTokens,
        price: tempPassCategoryDetail.price,
      };

      if (tempPassCategoryDetail.tokenId) {
        tempFormValues.tokenId = tempPassCategoryDetail.tokenId;
      } else {
        tempFormValues.tokenId = 0;
      }

      setInitialValue(tempFormValues);
      setPassCategoryId(tempPassCategoryId);
    } else {
      console.log('else');

      // router.push(ROUTES.home());
      prevPage();
    }
  }, []);

  const formSubmitHandler = (
    values: FormPassCategoryValues,
    { setSubmitting }: FormikHelpers<FormPassCategoryValues>,
  ) => {
    const PassCategoryDetail: UpdatePassCategory = {
      title: values.title,
      numberOfTokens: values.numberOfTokens,
      price: values.price,
    };

    if (typeof values.tokenId !== 'string' && values.tokenId) {
      PassCategoryDetail.tokenId = values.tokenId;
    }

    setCurrentPassCategory(PassCategoryDetail);
    setShowModal(true);
    setSubmitting(false);
  };

  const updatePassCategoryHandler = async () => {
    try {
      if (passCategoryId && currentPassCategory) {
        const response = await updatePassCategory(
          passCategoryId,
          currentPassCategory,
        );

        const { message, data } = response;
        if (message === 'success') {
          setShowModal(false);
          toast.success('updatePassCategory successfully');
          prevPage();
        }
      }
    } catch (error: any) {
      console.log(' updatePassCategory Error: ', error.message);
      toast.error('updatePassCategory Error');
    }
  };

  const deletePassCategoryHandler = async () => {
    try {
      if (passCategoryId) {
        console.log('tempPassCategoryId: ', passCategoryId);
        const response = await deletePassCategory(passCategoryId);
        const { message, data } = response;

        if (message === 'success') {
          toast.success('Deleted successfully');
          prevPage();
        }
      }
    } catch (error: any) {
      console.log('deletePassCategory Error: ', error.message);
      toast.error('deletePassCategory Error');
    }
  };

  return (
    <div className="flex justify-between px-2 py-5 sm:py-8 sm:px-0">
      <div className="form-container">
        {initialValue && (
          <PassCategoryForm
            buttonTitle="Update"
            formInitialValues={initialValue}
            formSubmitHandler={formSubmitHandler}
            contractType={currentContractType}
          />
        )}

        {showModal && currentPassCategory && (
          <PassCategoryModal
            modalTitle="Update Pass Category"
            isModalOpen={showModal}
            passCategoryData={currentPassCategory}
            handleCloseModal={() => setShowModal(false)}
            updatePassCategory={updatePassCategoryHandler}
          />
        )}
      </div>

      <div className="flex-col hidden w-2/5 px-4 pt-3 md:flex sm:px-6 lg:px-8">
        <div>
          <Button
            onClick={deletePassCategoryHandler}
            bgColor="bg-black hover:bg-gray-700 border-transparent"
            padding="px-4 py-2"
            textProperties="text-white text-sm leading-4 text-gray-200"
            width="w-auto"
          >
            Delete
          </Button>

          <p className="w-4/5 mt-2 text-sm font-medium font-Roboto">
            Read more about Passes Category
            <span className="pl-0.5 text-link">here</span>. You can later create
            Passes Categories.
          </p>
        </div>

        <div className="mt-8">
          <div className="max-w-md font-Roboto">
            <Label>
              <h3 className="text-2xl font-black">Pass Category Title</h3>
            </Label>

            <p className="mt-1 text-sm">
              The Pass Category title is the main identifier for your contract
              and will appear anywhere your contract is mentioned. This is
              usually your artist name, brand, or identity.
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

export default EditPassCategory;
