import { useEffect, useRef } from 'react';
import { FormikHelpers } from 'formik';
import { compareAsc, format } from 'date-fns';

import { FormEventValues } from './EventForm/type';

import { Image } from '@/Atoms/Image';
import { EventForm } from './EventForm';

import axios from '@/utils/Axios';
import { PageTitle } from '@/utils/GeneralFunctions';
const Events = () => {
  useEffect(() => {
    if (document) {
      PageTitle('Create Events');
    }
  }, []);

  const initialValue: FormEventValues = {
    title: '',
    description: '',
    startDate: format(new Date(), 'yyyy-MM-dd hh:mm').replace(' ', 'T'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    profileURL: '',
    coverURL: '',
  };

  const formSubmitHandler = async (
    values: FormEventValues,
    { setSubmitting }: FormikHelpers<FormEventValues>,
  ) => {
    const EventData = {
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

    axios
      .post('/event', EventData)
      .then((response) => {
        console.log('Response: ', response.data);
        alert(JSON.stringify(response.data.data, null, 2));
        setSubmitting(false);
      })
      .catch((error) => console.log('create event error', error.message));
  };

  return (
    <section className="flex justify-between px-4 py-5 sm:py-8 sm:px-0">
      <div className="relative flex items-center w-full px-4 py-4 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm md:w-2/3 sm:px-6 sm:py-5 hover:shadow-lg">
        <EventForm
          formTitle="Create Event"
          buttonTitle="Create Event"
          formSubmitHandler={formSubmitHandler}
          formInitialValues={initialValue}
        />
      </div>

      <div className="flex-col hidden w-2/5 pt-6 md:flex sm:px-6 lg:px-8">
        <div className="mt-16">
          <Image
            src="images/event.jpg"
            alt="nft-even-img"
            className="z-0 max-w-md mx-3 my-auto skew-y-12 border border-gray-300 rounded-lg cursor-grabbing drop-shadow-2xl -rotate-3 h-fit w-fit aspect-square dark:shadow-primary-400 hover:translate-y-4 hover:my-rotate-y-180"
          />
        </div>
      </div>
    </section>
  );
};

export default Events;
