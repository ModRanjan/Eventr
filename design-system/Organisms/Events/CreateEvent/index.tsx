import { Button } from '@/Atoms/Button';
import AuthInput from '@/Atoms/Input/AuthInput';
import { Label } from '@/Atoms/Label';
import { Formik, Form, FormikHelpers } from 'formik';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import axios from '@/utils/Axios';
import { FormEventValues } from './type';

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

  const initialValue: FormEventValues = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    profileURL: '',
    coverURL: '',
  };

  const formSubmitHandler = async (postData: any) => {
    axios.post('/event', postData).then((response) => {
      console.log('Response: ', response);
      setTimeout(() => {
        alert(JSON.stringify(postData, null, 2));
      }, 500);
    });
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
          onSubmit={async (
            values: FormEventValues,
            { setSubmitting }: FormikHelpers<FormEventValues>,
          ) => {
            const postData = {
              title: values.title,
              description: values.description,
              startDate: values.startDate,
              endDate: values.endDate,
              profile: {
                url: values.profileURL,
                size: 150,
                mimeType: 'image',
                extension: '.png',
              },
              cover: {
                url: values.profileURL,
                size: 150,
                mimeType: 'image',
                extension: '.png',
              },
            };
            await formSubmitHandler(postData);
            setSubmitting(false);
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

            <Button
              type="submit"
              display="inline-flex self-end"
              bgColor="bg-black hover:bg-gray-700"
              padding="px-4 py-2.5"
              textProperties="leading-4 text-white"
              width="w-auto"
            >
              Create Event
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
