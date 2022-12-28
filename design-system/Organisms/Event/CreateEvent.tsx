import { useState } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { FormikHelpers } from 'formik';
import { compareAsc, format } from 'date-fns';

import { EventForm } from '@/Molecules/Forms/EventForm';
import { EventModal } from '@/Molecules/Modals/EventModal';
import { FormEventValues } from '@/Molecules/Forms/EventForm/type';
import { FieldDetails } from '@/Molecules/Forms/EventForm/FieldDetails';

import { ROUTES } from '@/config/routes';
import { createEvent } from '@/services/event';
import { getEventCreateValues } from '@/utils/Event';
import { CreateEvent } from 'types/createEvent.type';

const initialValue: FormEventValues = {
  title: '',
  description: '',
  startDate: format(new Date(), 'yyyy-MM-dd hh:mm').replace(' ', 'T'),
  endDate: format(new Date(), 'yyyy-MM-dd'),
  profileURL: '',
  coverURL: '',
};

const CreateEvents = () => {
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState<CreateEvent>();

  const formSubmitHandler = async (
    values: FormEventValues,
    { setSubmitting }: FormikHelpers<FormEventValues>,
  ) => {
    const tempEvent: CreateEvent = getEventCreateValues(values);

    if (tempEvent) {
      setSubmitting(false);
      setEventData(tempEvent);
      setShowModal(true);
    }
  };

  const createEventHandler = (eventData: CreateEvent) => {
    createEvent(eventData)
      .then((response) => {
        const { message, data } = response;
        console.log('Event Created With Data:', data);

        if (message === 'success') {
          toast.success('Event Created successful');
          setShowModal(false);
          Router.push(ROUTES.home());
        }
      })
      .catch((error) => {
        console.log('createEvent Error:', error.message);
      });
  };

  return (
    <section className="flex justify-between sm:px-0">
      <div className="form-container">
        <EventForm
          formTitle="Create Event:"
          buttonTitle="Create"
          formInitialValues={initialValue}
          formSubmitHandler={formSubmitHandler}
        />
        {showModal && eventData && (
          <EventModal
            modalTitle="Create Event"
            isModalOpen={showModal}
            eventData={eventData}
            handleCloseModal={() => setShowModal(false)}
            createEvent={createEventHandler}
          />
        )}
      </div>

      <div className="flex-col hidden w-2/5 px-4 pt-3 md:flex sm:px-6 lg:px-8">
        <FieldDetails />
      </div>
    </section>
  );
};

export default CreateEvents;
