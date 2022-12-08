import { useEffect, useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';

import { Button } from '@/Atoms/Button';
import { Label } from '@/Atoms/Label';
import { AuthInput } from '@/Atoms/Input/AuthInput';

import { FormEventValues } from './type';
import { createSchema } from '../../../validation/schema/event';
import { useRouter } from 'next/router';

type EventFormProps = {
  buttonTitle: string;
  formTitle: string;
  formInitialValues: FormEventValues;
  formSubmitHandler: (
    values: FormEventValues,
    { setSubmitting }: FormikHelpers<FormEventValues>,
  ) => void;
  eventDeleteHandler?: () => void;
};

export const EventForm = ({
  formSubmitHandler,
  eventDeleteHandler,
  formInitialValues,
  formTitle,
  buttonTitle,
}: EventFormProps) => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState<string>();
  const [formValues, setFormValues] = useState(formInitialValues);

  useEffect(() => {
    const path = router.asPath;

    setFormValues(formInitialValues);
    setCurrentPath(path);
  }, [formInitialValues]);

  return (
    <div className="flex flex-col w-full ">
      <Label className="px-4 py-1 text-3xl border-b border-gray-400 sm:px-8 text-primary-800 font-Roboto dark:text-primary-300">
        <span>{formTitle}</span>
      </Label>

      <div className="px-4 py-5 sm:px-6 lg:px-8 sm:py-8 hover:shadow-lg">
        <div className="px-4 py-5 border border-black sm:p-6">
          <Formik
            initialValues={formValues}
            validationSchema={createSchema}
            onSubmit={formSubmitHandler}
          >
            <Form className="flex flex-col gap-y-4">
              <AuthInput
                name="title"
                label="Event Name:"
                placeholder="Jingle Bell Rockout"
                type="input"
              />

              <div className="flex flex-col justify-between gap-x-6 md:flex-row">
                <div className="flex-1">
                  <AuthInput
                    name="startDate"
                    label="Start Date:"
                    type="datetime-local"
                    // width="w-auto"
                    // display="inline-flex flex-1"
                  />
                </div>

                <div className="flex-1">
                  <AuthInput
                    name="endDate"
                    label="End Date:"
                    type="date"
                    // width="w-auto"
                  />
                </div>
              </div>

              <AuthInput
                name="profileURL"
                label="Cover ImageURL:"
                placeholder="simform.xyz"
                type="input"
              />

              <AuthInput
                name="coverURL"
                label="Profile ImageURL:"
                placeholder="blockchain.xyz"
                type="input"
              />

              <AuthInput
                name="description"
                label="Description:"
                placeholder="Chrismas Event"
                type="input"
              />

              <div className="flex self-end gap-x-4">
                {currentPath !== '/Events' && (
                  <Button
                    type="button"
                    onClick={eventDeleteHandler}
                    bgColor="bg-white hover:bg-gray-300 border-gray-400"
                    padding="px-4 py-2.5"
                    textProperties="leading-4 whitespace-nowrap text-black text-sm font-medium"
                    width="w-auto"
                  >
                    Delete
                  </Button>
                )}
                <Button
                  type="submit"
                  bgColor="bg-black hover:bg-gray-700"
                  padding="px-4 py-2.5"
                  textProperties="whitespace-nowrap leading-4 text-white text-sm font-medium"
                  width="w-auto"
                >
                  {buttonTitle}
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
