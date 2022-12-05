import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FormikHelpers } from 'formik';
import { compareAsc, format } from 'date-fns';
import { AiOutlineLeft } from 'react-icons/ai';

import { Icon } from '@/Atoms/Icon';
import { Button } from '@/Atoms/Button';
import { Label } from '@/Atoms/Label';

import { EventForm } from '@/Organisms/Events/EventForm';
import { FormEventValues } from '@/Organisms/Events/EventForm/type';
import PageLayout from '@/Organisms/Layout/PageLayout';

import axios from '@/utils/Axios';

import { event } from '@/redux/event/types';

const Eventdetails = () => {
  const router = useRouter();
  const [eventDatails, setEventDatails] = useState<FormEventValues>();
  const [eventId, setEventId] = useState<number>();

  const prevPage = () => {
    router.push('/Home');
  };

  const fetchEventBySlug = async (slug: string | string[]) => {
    await axios
      .get(`/event/${slug}`)
      .then(async (response) => {
        const eventData: event = await response.data.data.event;

        const eventId = eventData.id;

        const tempEventDetails = {
          title: eventData.title,
          description: eventData.description,
          startDate: format(
            new Date(eventData.startDate),
            'yyyy-MM-dd hh:mm',
          ).replace(' ', 'T'),
          endDate: format(new Date(eventData.endDate), 'yyyy-MM-dd'),
          profileURL: eventData.Files[0].url,
          coverURL: eventData.Files[1].url,
        };

        setEventId(eventId);
        setEventDatails(tempEventDetails);
      })
      .catch((error) => console.log('getEventBySlug Error: ', error));
  };

  useEffect(() => {
    const slug = router.query.slug;

    if (slug !== 'undefined' && slug !== undefined) {
      fetchEventBySlug(slug);
    }
  }, [router.query.slug]);

  const formSubmitHandler = async (
    values: FormEventValues,
    { setSubmitting }: FormikHelpers<FormEventValues>,
  ) => {
    const updatedData = {
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
      .put(`/event/${eventId}`, updatedData)
      .then((response) => {
        console.log('Response: ', response.data);
        alert(JSON.stringify(response.data.data, null, 2));
        setSubmitting(false);
        prevPage();
      })
      .catch((error) => console.log('create event error', error.message));
  };

  const eventDeleteHandler = async () => {
    axios
      .delete(`/event/${eventId}`)
      .then((responseData) => {
        const responseMessage = responseData.data.message;

        if (responseMessage === 'success')
          alert(`Event With EventId: ${eventId} is deleted!`);
        prevPage();
      })
      .catch((error) => console.log('Delete event error', error.message));
  };

  return (
    eventDatails && (
      <div className="top-0 z-50 bg-white">
        <PageLayout>
          <div className="py-5 sm:py-8">
            <Label className="flex items-center justify-between max-w-6xl mx-auto ">
              <div className="inline-flex items-center flex-none">
                <Button
                  onClick={prevPage}
                  customClasses="border-0 font-black inline-flex items-center gap-x-1"
                >
                  <Icon className="w-4 h-6 ml-1" icon={AiOutlineLeft} />
                  <span className="text-sm">Go back</span>
                </Button>
              </div>
              <div className="inline-flex items-center flex-none justify-self-end">
                <Button
                  onClick={eventDeleteHandler}
                  bgColor="bg-black hover:bg-gray-700"
                  textProperties="text-sm text-gray-200"
                >
                  Delete Event
                </Button>
              </div>
            </Label>

            <div className="flex justify-between px-4 py-5 sm:py-8 sm:px-0">
              <div className="relative flex items-center w-full px-4 py-4 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm md:w-2/3 sm:px-6 sm:py-5 hover:shadow-lg">
                <EventForm
                  formInitialValues={eventDatails}
                  formTitle={`Update ${eventDatails.title} Event:`}
                  buttonTitle="Update"
                  formSubmitHandler={formSubmitHandler}
                />
              </div>
            </div>
          </div>
        </PageLayout>
      </div>
    )
  );
};

export default Eventdetails;
