import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, FormikHelpers } from 'formik';

import { Button } from '@/Atoms/Button';
import { Label } from '@/Atoms/Label';
import { AuthInput } from '@/Atoms/Input/AuthInput';
import { Logo } from '@/Molecules/Logo';

import { FormEventValues } from './type';
import { EventSchema } from '../../../../validation/schema/event';

type EventFormProps = {
  buttonTitle: string;
  formTitle: string;
  formInitialValues: FormEventValues;
  formSubmitHandler: (
    values: FormEventValues,
    { setSubmitting, resetForm }: FormikHelpers<FormEventValues>,
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
    // console.log('formInitialValues: ', formInitialValues);
    setFormValues(formInitialValues);
    setCurrentPath(path);
  }, [formInitialValues]);

  return (
    <div className="flex flex-col w-full">
      <Label className="form-title">
        <span>{formTitle}</span>

        <Logo className="inline-block float-right w-auto h-8 ml-auto" />
      </Label>

      <div className="form-body">
        <div className="form">
          <Formik
            initialValues={formValues}
            validationSchema={EventSchema}
            onSubmit={formSubmitHandler}
            // validateOnMount
          >
            {(formik) => {
              return (
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
                      />
                    </div>

                    <div className="flex-1">
                      <AuthInput name="endDate" label="End Date:" type="date" />
                    </div>
                  </div>

                  <AuthInput
                    name="profileURL"
                    label="Profile ImageURL:"
                    placeholder="simform.xyz"
                    type="input"
                  />

                  <AuthInput
                    name="coverURL"
                    label="Cover ImageURL:"
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
                      disabled={!formik.isValid || formik.isSubmitting}
                    >
                      {buttonTitle}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};
