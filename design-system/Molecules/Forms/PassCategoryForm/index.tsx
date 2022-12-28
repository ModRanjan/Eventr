import { useEffect, useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';

import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';
import { AuthInput } from '@/Atoms/Input/AuthInput';

import { Logo } from '@/Molecules/Logo';

import { FormPassCategoryValues } from './type';
import { PassCategorySchema } from '../../../../validation/schema/PassCategory';

type PassCategoryProps = {
  formSubmitHandler: (
    values: FormPassCategoryValues,
    { setSubmitting }: FormikHelpers<FormPassCategoryValues>,
  ) => void;
  formInitialValues: FormPassCategoryValues;
  contractType: 'ERC721' | 'ERC1155';
  buttonTitle: string;
};

export const PassCategoryForm = ({
  buttonTitle,
  contractType,
  formSubmitHandler,
  formInitialValues,
}: PassCategoryProps) => {
  const [formValues, setFormValues] = useState(formInitialValues);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setFormValues(formInitialValues);

    if (contractType === 'ERC1155') {
      setIsDisabled(false);
    }
  }, [formInitialValues, contractType]);

  return (
    <div className="flex flex-col w-full">
      <Label className="px-3 form-title">
        <span>Pass Category</span>

        <Logo className="inline-block float-right w-auto h-8 ml-auto" />
      </Label>

      <Formik
        initialValues={formValues}
        validationSchema={PassCategorySchema}
        onSubmit={formSubmitHandler}
      >
        <Form>
          <div className="border-b border-black">
            <div className="flex flex-col p-3 gap-y-4 sm:p-4">
              <AuthInput
                name="title"
                label="pass category title"
                placeholder="Gold"
                type="input"
                customClasses="placeholder-gray-300 text-xl font-normal sm:text-2xl w-full font-black focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-center border-b border-black">
            <div className="flex flex-col w-1/2 p-3 sm:p-4">
              <AuthInput
                name="numberOfTokens"
                label="Number Of Passes"
                type="number"
                customClasses="placeholder-gray-300 text-xl font-normal sm:text-2xl w-full font-black focus:outline-none"
              />
            </div>

            <div className="flex flex-col w-1/2 p-3 border-l border-black sm:p-4">
              <AuthInput
                name="price"
                label="Price"
                type="number"
                customClasses="placeholder-gray-300 text-xl font-normal sm:text-2xl w-full font-black focus:outline-none"
              />
            </div>
          </div>

          <div className="border-b border-black">
            <div className="flex flex-col p-3 gap-y-4 sm:p-4">
              <AuthInput
                name="tokenId"
                label="Token Id"
                type="number"
                disabled={isDisabled}
                customClasses="placeholder-gray-300 text-xl font-normal sm:text-2xl w-full font-black focus:outline-none"
              />
            </div>
          </div>

          <div className="flex p-3 sm:p-4">
            <Button
              type="submit"
              bgColor="bg-black hover:bg-gray-700"
              display="inline-flex self-end"
              padding="px-4 py-2.5 ml-auto"
              textProperties="leading-4 text-white"
              width="w-auto"
            >
              {buttonTitle}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
