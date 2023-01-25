import { useEffect, useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';

import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';
import { AuthInput } from '@/Atoms/Input/AuthInput';
import { Logo } from '@/Molecules/Logo';

import { FormPassValues, FormPassOptions } from './type';
import { PassSchema } from '../../../../validation/schema/pass';

const contractType = {
  ERC721: ['mint'],
  ERC1155: ['mint', 'premint', 'claim'],
};

type PassFormTypes = {
  formSubmitHandler: (
    values: FormPassValues,
    { setSubmitting }: FormikHelpers<FormPassValues>,
  ) => void;
  formInitialValues: FormPassValues;
  options?: FormPassOptions;
  formTitle: string;
  buttonTitle: string;
};

export const PassForm = ({
  buttonTitle,
  formTitle,
  formSubmitHandler,
  formInitialValues,
  options,
}: PassFormTypes) => {
  const [formValues, setFormValues] = useState(formInitialValues);
  const [currentContract, setCurrentContract] = useState('');
  const [dropValues, setDropValues] = useState<string[]>([]);

  useEffect(() => {
    const tempCurrentContract = currentContract;
    if (tempCurrentContract === 'ERC1155') {
      const temp = contractType.ERC1155;

      setDropValues(temp);
    } else {
      const temp = contractType.ERC721;

      setDropValues(temp);
    }
  }, [currentContract]);

  useEffect(() => {
    setFormValues(formInitialValues);
  }, [formInitialValues]);

  return (
    <div className="flex flex-col w-full">
      <Label className="px-3 form-title">
        <span>{formTitle}</span>

        <Logo className="inline-block float-right w-auto h-8 ml-auto" />
      </Label>

      <Formik
        initialValues={formValues}
        validationSchema={PassSchema}
        onSubmit={formSubmitHandler}
      >
        {(formik) => {
          setCurrentContract(formik.values.contractType);
          return (
            <Form>
              <div className="border-t border-b border-black">
                <div className="flex flex-col p-3 gap-y-4 sm:p-4">
                  <AuthInput
                    name="title"
                    label="Pass Title"
                    placeholder="Eg. MAD DOG Jones"
                    type="input"
                    customClasses="placeholder-gray-300 text-xl sm:text-2xl w-full font-black focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-center border-b border-black">
                <div className="flex flex-col w-1/2 p-3 sm:p-4">
                  <AuthInput
                    name="contractType"
                    label="Contract Type"
                    placeholder="Eg. MAD DOG Jones"
                    type="select"
                    customClasses="bg-transparent placeholder-gray-300 text-xl sm:text-2xl w-full font-black focus:outline-none"
                    options={options?.contractType}
                  />
                </div>

                <div className="flex flex-col w-1/2 p-3 border-l border-black sm:p-4">
                  <AuthInput
                    name="dropType"
                    label="Drop Type"
                    placeholder="Eg. MAD DOG Jones"
                    type="select"
                    customClasses="placeholder-gray-300 text-xl sm:text-2xl w-full font-black focus:outline-none"
                    options={dropValues}
                  />
                </div>
              </div>

              <div className="border-b border-black">
                <div className="flex flex-col p-3 gap-y-4 sm:p-4">
                  <AuthInput
                    name="contractAddress"
                    label="contract Address"
                    placeholder="0x0000000000000000000000000000000000000000"
                    type="input"
                    customClasses="bg-transparent placeholder-gray-300 text-xl sm:text-2xl w-full font-black focus:outline-none"
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
                  // disabled={!formik.isVaild}
                >
                  {buttonTitle}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
