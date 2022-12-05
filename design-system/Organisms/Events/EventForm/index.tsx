import { useEffect, useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';

import { Button } from '@/Atoms/Button';
import { Label } from '@/Atoms/Label';
import { AuthInput } from '@/Atoms/Input/AuthInput';

import { FormEventValues } from './type';
import { validationSchema } from './formValidation';

type EventFormProps = {
  formSubmitHandler: (
    values: FormEventValues,
    { setSubmitting }: FormikHelpers<FormEventValues>,
  ) => void;
  formTitle: string;
  buttonTitle: string;
  formInitialValues: FormEventValues;
};

export const EventForm = ({
  formSubmitHandler,
  formInitialValues,
  formTitle,
  buttonTitle,
}: EventFormProps) => {
  const [formValues, setFormValues] = useState(formInitialValues);

  useEffect(() => {
    setFormValues(formInitialValues);
  }, [formInitialValues]);

  return (
    <div className="flex flex-col w-full p-2 border border-black">
      <Label>
        <h3 className="px-4 text-3xl text-primary-800 dark:text-primary-300">
          {formTitle}
        </h3>
      </Label>

      <div className="px-3 py-5 sm:p-4">
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={formSubmitHandler}
        >
          <Form className="flex flex-col gap-y-4">
            <AuthInput
              name="title"
              label="Event Name:"
              placeholder="Jingle Bell Rockout"
              type="text"
            />

            <AuthInput
              name="description"
              label="Description:"
              placeholder="Chrismas Event"
              type="text"
            />

            <AuthInput
              name="startDate"
              label="Start Date:"
              type="datetime-local"
            />

            <AuthInput name="endDate" label="End Date:" type="date" />

            <AuthInput
              name="profileURL"
              label="Cover ImageURL:"
              placeholder="simform.xyz"
              type="text"
            />

            <AuthInput
              name="coverURL"
              label="Profile ImageURL:"
              placeholder="blockchain.xyz"
              type="text"
            />

            <Button
              type="submit"
              display="inline-flex self-end"
              bgColor="bg-black hover:bg-gray-700"
              padding="px-4 py-2.5"
              textProperties="leading-4 text-white"
              width="w-auto"
            >
              {buttonTitle}
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
