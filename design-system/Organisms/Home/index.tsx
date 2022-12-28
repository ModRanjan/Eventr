import { useEffect, useState } from 'react';
import Router from 'next/router';

import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

import { AllEvents } from '@/Molecules/AllEvents';

import { Event } from '@/redux/event/types';
import { useAppDispatch } from '@/redux/hooks';
import { setEvents } from '@/redux/event/eventSlice';

import { ROUTES } from '@/config/routes';
import { getMyEvents } from '@/services/event';

const Home = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [allEvent, setAllEvent] = useState<Event[]>([]);

  useEffect(() => {
    const myEvents = async () => {
      setLoading(true);
      let tempEventData: Event[] = [];

      getMyEvents()
        .then((response) => {
          const eventsData = response.data;

          eventsData.map((eventData: any) => {
            if (eventData) {
              const event: Event = {
                id: eventData.id,
                slug: eventData.slug,
                title: eventData.title,
                startDate: eventData.startDate,
                endDate: eventData.endDate,
                Files: eventData.Files,
              };

              if (eventData.description) {
                event.description = eventData.description;
              }

              tempEventData.push(event);
            }
          });
          setAllEvent(tempEventData);
          dispatch(setEvents(tempEventData));
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
        <h3 className="section-title">My Events</h3>

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
        <AllEvents
          className="grid grid-cols-1 gap-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3"
          events={allEvent}
        />
      </div>
    </>
  );
};

export default Home;
