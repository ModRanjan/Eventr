import { useEffect, useState } from 'react';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';

import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

import { PassCategoryForm } from '@/Molecules/Forms/PassCategoryForm';
import { PassCategoryModal } from '@/Molecules/Modals/PassCategoryModal';
import { FormPassCategoryValues } from '@/Molecules/Forms/PassCategoryForm/type';

import { useAppSelector } from '@/redux/hooks';
import { createPassCategory } from '@/services/PassCategory';
import { CreatePassCategory } from 'types/passCategory';

const initialValue: FormPassCategoryValues = {
  title: '',
  numberOfTokens: 0,
  price: 0,
  tokenId: 0,
};

type CreatePassCategoriesProps = {
  prevPage: () => void;
};

const CreatePassCategories = ({ prevPage }: CreatePassCategoriesProps) => {
  const [showModal, setShowModal] = useState(false);
  const [passId, setPassId] = useState<number>();
  const [currentContractType, setCurrentContractType] = useState<
    'ERC721' | 'ERC1155'
  >('ERC721');
  const [currentPassCategory, setCurrentPassCategory] =
    useState<CreatePassCategory>();
  const currentPassDetail = useAppSelector((state) => state.pass);

  useEffect(() => {
    const tempCurrentPass = currentPassDetail.pass;
    const tempPassId = tempCurrentPass?.id;
    const tempConteractType = tempCurrentPass?.contractType;

    if (tempPassId && tempConteractType) {
      setPassId(tempPassId);
      setCurrentContractType(tempConteractType);
    }
  }, [currentPassDetail]);

  const formSubmitHandler = (
    values: FormPassCategoryValues,
    { setSubmitting }: FormikHelpers<FormPassCategoryValues>,
  ) => {
    if (passId) {
      const PassCategoryDetail: CreatePassCategory = {
        title: values.title,
        numberOfTokens: values.numberOfTokens,
        price: values.price,
        passId: passId,
      };

      if (typeof values.tokenId !== 'string' && values.tokenId) {
        PassCategoryDetail.tokenId = values.tokenId;
      }

      setCurrentPassCategory(PassCategoryDetail);
      setShowModal(true);
      setSubmitting(false);
    } else {
      throw console.error('No PassId Found!');
    }
  };

  const createPassCategoryHandler = () => {
    if (currentPassCategory)
      createPassCategory(currentPassCategory)
        .then((response) => {
          const passCategoryData = response.data;
          toast.success('Pass Category Created');

          prevPage();
        })
        .catch((error) =>
          console.log('createPassCategory Error', error.message),
        );
  };

  return (
    <div className="flex justify-between px-2 py-5 sm:py-8 sm:px-0">
      <div className="form-container">
        <PassCategoryForm
          buttonTitle="Create"
          formInitialValues={initialValue}
          formSubmitHandler={formSubmitHandler}
          contractType={currentContractType}
        />

        {showModal && currentPassCategory && (
          <PassCategoryModal
            modalTitle="Create Pass Category"
            isModalOpen={showModal}
            passCategoryData={currentPassCategory}
            handleCloseModal={() => setShowModal(false)}
            createPassCategory={createPassCategoryHandler}
          />
        )}
      </div>

      <div className="flex-col hidden w-2/5 px-4 pt-3 md:flex sm:px-6 lg:px-8">
        <div>
          <Button
            onClick={prevPage}
            bgColor="bg-black hover:bg-gray-700 border-transparent"
            padding="px-4 py-2"
            textProperties="text-white text-sm leading-4 text-gray-200"
            width="w-auto"
          >
            Passes
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

export default CreatePassCategories;
