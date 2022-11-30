import { Button } from '@/Atoms/Button';
import AuthInput from '@/Atoms/Input/AuthInput';
import { Label } from '@/Atoms/Label';
import { Formik, Form, FormikHelpers } from 'formik';
import { useRef, useState } from 'react';
import * as Yup from 'yup';

interface FormCreateEventValues {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  profileURL: string;
  coverURL: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Required!'),
  description: Yup.string().required('Required!'),
  startDate: Yup.string().required('Required!'),
  endDate: Yup.string().required('Required!'),
  profileURL: Yup.string().required('Required!'),
  coverURL: Yup.string().required('Required!'),
});

export const CreateEvent = () => {
  const [formValues, setFormValues] = useState(null);

  const initialValue: FormCreateEventValues = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    profileURL: '',
    coverURL: '',
  };

  return (
    <div className="flex flex-col w-full p-2 border border-black">
      <Label>
        <h3 className="px-4 text-3xl text-primary-800 dark:text-primary-300">
          Create Event:
        </h3>
      </Label>

      <div className="px-3 py-5 sm:p-4">
        <Formik
          initialValues={formValues || initialValue}
          validationSchema={validationSchema}
          onSubmit={(
            values: FormCreateEventValues,
            { setSubmitting }: FormikHelpers<FormCreateEventValues>,
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
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
              placeholder="2022-09-12 04:38:21.322+00"
              type="date"
            />

            <AuthInput
              name="endDate"
              label="End Date:"
              placeholder="2022-09-12 04:38:21.322+00"
              type="date"
            />
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
          </Form>
        </Formik>
        <div className="float-right mt-4">
          <Button
            bgColor="bg-black hover:bg-gray-700"
            padding="px-3 py-2"
            textProperties="leading-4 whitespace-nowrap text-white"
          >
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
};
