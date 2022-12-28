import { useEffect, useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';

import { Button } from '@/Atoms/Button';
import { Label } from '@/Atoms/Label';
import { AuthInput } from '@/Atoms/Input/AuthInput';
import { FormProfileValues } from './type';
import { userFormValidationSchema } from './userFormValidation';

type ProfileFormProps = {
  formSubmitHandler: (
    values: FormProfileValues,
    { setSubmitting }: FormikHelpers<FormProfileValues>,
  ) => void;
  formInitialValues: FormProfileValues;
};

const Profile = ({
  formSubmitHandler,
  formInitialValues,
}: ProfileFormProps) => {
  const [formValues, setFormValues] = useState(formInitialValues);

  useEffect(() => {
    setFormValues(formInitialValues);
  }, [formInitialValues]);

  return (
    <div className="px-4 py-5 sm:py-6 sm:px-0">
      <Label className="px-4 sm:px-6 lg:px-8">
        <h3 className="section-title"> Profile settings</h3>
      </Label>

      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="px-4 py-5 sm:py-6 sm:px-0">
          <div className="max-w-4xl overflow-hidden bg-white border border-gray-400 rounded-lg hover:shadow-lg">
            <div className="px-4 py-5 sm:p-6">
              <Formik
                initialValues={formValues}
                validationSchema={userFormValidationSchema}
                onSubmit={formSubmitHandler}
              >
                <Form className="flex flex-col gap-y-6">
                  <AuthInput
                    name="name"
                    label="Name:"
                    placeholder="xyz"
                    type="text"
                    width="max-w-xs w-full"
                  />

                  <AuthInput
                    name="userName"
                    label="User Name:"
                    placeholder="xyz.kumarn"
                    type="text"
                    width="max-w-xs w-full"
                  />

                  <AuthInput
                    name="email"
                    label="Email: "
                    placeholder="xyz.2@solutions.com"
                    type="email"
                    width="max-w-xs w-full"
                  />

                  <AuthInput
                    name="profileURL"
                    label="Profile ImageURL:"
                    placeholder="simform.xyz"
                    type="text"
                  />

                  <AuthInput
                    name="coverURL"
                    label="Cover ImageURL:"
                    placeholder="blockchain.xyz"
                    type="text"
                  />

                  <Button
                    type="submit"
                    display="inline-flex self-end"
                    bgColor="bg-black hover:bg-gray-700"
                    padding="px-4 py-2"
                    textProperties="leading-4 text-white"
                    width="w-fit"
                  >
                    Save profile
                  </Button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
