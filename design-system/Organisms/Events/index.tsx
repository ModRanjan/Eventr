import { useEffect, useState } from 'react';
import Router from 'next/router';

import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

import { AllEvents } from '@/Molecules/AllEvents';
import DeployedEvents from '@/Organisms/Deployed/ContractEvents';

import { Event } from '@/redux/event/types';
import { useAppDispatch } from '@/redux/hooks';
import { setEvents } from '@/redux/event/eventSlice';

import { ROUTES } from '@/config/routes';
import { getMyEvents } from '@/services/event';

type HomeProps = {
  pageTitle: string;
};

const Home = ({ pageTitle }: HomeProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [usersAllEvent, setUsersAllEvent] = useState<Event[]>([]);

  // get and save All Events
  useEffect(() => {
    const myEvents = async () => {
      setLoading(true);
      let tempEventData: Event[] = [];

      getMyEvents()
        .then((response) => {
          const { data, message } = response;

          if (data.length) {
            data.map((eventData: any) => {
              const event: Event = {
                id: eventData.id,
                slug: eventData.slug,
                title: eventData.title,
                startDate: eventData.startDate,
                endDate: eventData.endDate,
                Files: eventData.Files,
                published: eventData.published,
              };

              if (eventData.description) {
                event.description = eventData.description;
              }

              tempEventData.push(event);
            });

            setUsersAllEvent(tempEventData);
            dispatch(setEvents(tempEventData));
          }
        })
        .catch((error) => {
          console.log('getMyEvents Error:', error.message);
        });

      setLoading(false);
    };

    myEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen mt-5">
        <div className="p-12 text-center border-2 border-gray-300 rounded-lg">
          <Label className="my-8 text-2xl font-semibold text-gray-500">
            <span>Loding ...</span>
          </Label>
        </div>
      </div>
    );
  }

  return (
    <>
      <Label className="flex items-center justify-between">
        <h3 className="section-title">{pageTitle}</h3>

        <div className="justify-self-end">
          <Button
            bgColor="bg-black hover:bg-gray-700"
            padding="px-3 py-2.5"
            textProperties="whitespace-nowrap text-white text-sm leading-4"
            onClick={() => Router.push(ROUTES.events.create())}
          >
            Create Event
          </Button>
        </div>
      </Label>

      <div className="px-2 py-5 sm:py-8 sm:px-0">
        {pageTitle === 'Events' ? (
          <DeployedEvents className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" />
        ) : (
          <AllEvents
            className="grid grid-cols-1 gap-4 gap-y-5 sm:grid-cols-2"
            events={usersAllEvent}
          />
        )}
      </div>
    </>
  );
};

export default Home;
