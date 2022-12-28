import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { FormikHelpers } from 'formik';
import { toast } from 'react-toastify';

import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

import { PassCard } from '@/Molecules/Cards/PassCard';
import { EventForm } from '@/Molecules/Forms/EventForm';
import { EventModal } from '@/Molecules/Modals/EventModal';
import { FormEventValues } from '@/Molecules/Forms/EventForm/type';
import { FieldDetails } from '@/Molecules/Forms/EventForm/FieldDetails';

import { useAppSelector } from '@/redux/hooks';

import { ROUTES } from '@/config/routes';
import { UpdateEvent } from 'types/createEvent.type';
import { getEventUpdatedValues } from '@/utils/Event';
import { deleteEvent, updateEvent } from '@/services/event';

type EditEventProps = {
  prevPage: () => void;
};

const EditEvent = ({ prevPage }: EditEventProps) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [eventId, setEventId] = useState<number>();
  const [coverURL, setCoverUrl] = useState('');
  const [profileURL, setProfileUrl] = useState('');
  const [currentEventSlug, setCurrentEventSlug] = useState<string>();
  const [prevEventData, setPrevEventData] = useState<FormEventValues>();
  const [updatedEventData, setUpdatedEventData] = useState<UpdateEvent>();
  const currentEvent = useAppSelector((state) => state.event.current);
  const currentPass = useAppSelector((state) => state.pass.pass);

  useEffect(() => {
    const slug = router.query.eventSlug;

    if (slug != undefined && typeof slug === 'string') {
      setCurrentEventSlug(slug);
    }
  }, [router.query]);

  useEffect(() => {
    const CurrentEvent = currentEvent?.event;

    let description = '';
    let profileURL = '';
    let coverURL = '';

    if (CurrentEvent?.description) {
      description = CurrentEvent?.description;
    }

    if (CurrentEvent?.Files?.length) {
      const Files = CurrentEvent?.Files;
      Files.map((file) => {
        if (file.type === 'Profile') {
          profileURL = file.url;
          setProfileUrl(profileURL);
        } else {
          coverURL = file.url;
          setCoverUrl(coverURL);
        }
      });
    }

    if (CurrentEvent) {
      const tempEventId = CurrentEvent.id;

      const tempEvent: FormEventValues = {
        title: CurrentEvent.title,
        description: description,
        startDate: format(
          new Date(CurrentEvent.startDate),
          'yyyy-MM-dd hh:mm',
        ).replace(' ', 'T'),
        endDate: format(new Date(CurrentEvent.endDate), 'yyyy-MM-dd'),
        profileURL: profileURL,
        coverURL: coverURL,
      };

      setPrevEventData(tempEvent);
      setEventId(tempEventId);
    }
  }, [currentEvent]);

  const formSubmitHandler = async (
    values: FormEventValues,
    { setSubmitting }: FormikHelpers<FormEventValues>,
  ) => {
    const updatedData: UpdateEvent = getEventUpdatedValues(
      values,
      profileURL,
      coverURL,
    );

    if (updatedData) {
      setSubmitting(false);
      setUpdatedEventData(updatedData);
      setShowModal(true);
    }
  };

  const updateEventHendler = async (
    eventId: number,
    eventData: UpdateEvent,
  ) => {
    updateEvent(eventId, eventData)
      .then((response) => {
        const { message, data } = response;
        console.log('Event Updated With ', data);

        if (message === 'success') {
          toast.success('Event Updated successful');
          setShowModal(false);
          prevPage();
        }
      })
      .catch((error) => {
        toast.error(`updateEvent Error`);
        console.log('updateEvent Error', error.message);
      });
  };

  const eventDeleteHandler = async () => {
    if (eventId) {
      deleteEvent(eventId)
        .then((responseData) => {
          const { message } = responseData;

          if (message === 'success') {
            toast.success(`Event ${prevEventData?.title} deleted successful`);
            router.push(ROUTES.home());
          }
        })
        .catch((error) => {
          toast.error(`deleteEvent Error`);
          console.log('deleteEvent Error', error.message);
        });
    }
  };

  const HasPass = () => {
    return (
      <>
        <Button
          onClick={() =>
            currentEventSlug &&
            router.push(ROUTES.passCategory.create(currentEventSlug))
          }
          bgColor="bg-black hover:bg-gray-700 border-transparent"
          padding="px-4 py-2"
          textProperties="text-white text-sm leading-4 text-gray-200"
          width="w-fit"
        >
          Create Pass Token
        </Button>

        <div className="max-w-md mt-12">
          <Label className="flex items-center justify-between gap-x-4">
            <h3 className="text-2xl font-black">Your Pass</h3>

            <Button
              type="button"
              display="inline-block"
              onClick={() =>
                currentEventSlug &&
                router.push(ROUTES.passes.edit(currentEventSlug))
              }
              padding="px-4 py-2"
              textProperties="leading-4 whitespace-nowrap text-black text-sm font-medium"
              width="w-fit h-fit"
            >
              Edit Pass
            </Button>
          </Label>

          <div className="mt-4">
            {currentPass && (
              <PassCard
                title={currentPass?.title}
                createdBy={currentPass.slug}
                imgURL={coverURL}
                passType={currentPass.dropType}
                contractAddress={currentPass.contractAddress}
                contractType={currentPass.contractType}
                onClick={() =>
                  currentEventSlug &&
                  router.push(ROUTES.passes.edit(currentEventSlug))
                }
              />
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col justify-between px-2 py-4 sm:py-5 sm:px-0 sm:flex-row">
      <div className="form-container">
        {prevEventData && (
          <EventForm
            formInitialValues={prevEventData}
            formTitle={`Update Event:`}
            buttonTitle="Update"
            formSubmitHandler={formSubmitHandler}
            eventDeleteHandler={eventDeleteHandler}
          />
        )}
        {showModal && updatedEventData && eventId && (
          <EventModal
            modalTitle="Update Event"
            isModalOpen={showModal}
            eventData={updatedEventData}
            eventId={eventId}
            handleCloseModal={() => setShowModal(false)}
            updateEvent={updateEventHendler}
          />
        )}
      </div>

      <div className="flex-col w-full px-0 pt-6 sm:pt-3 sm:w-2/5 md:flex sm:px-6 lg:px-8">
        {currentEvent?.hasPass ? (
          HasPass()
        ) : (
          <FieldDetails
            onClick={() =>
              currentEventSlug &&
              router.push(ROUTES.passes.create(currentEventSlug))
            }
          />
        )}
      </div>
    </div>
  );
};

export default EditEvent;
