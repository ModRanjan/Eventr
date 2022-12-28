import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';

import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

import { EventCard } from '@/Molecules/Cards/EventCard';
import { CreateEventProcess } from '@/Molecules/CreateEventProcess';

import { Event } from '@/redux/event/types';
import { useAppSelector } from '@/redux/hooks';

import { ROUTES } from '@/config/routes';

const EventDetails = () => {
  const router = useRouter();

  const [currentEventSlug, setCurrentEventSlug] = useState<string>();
  const [event, setEvent] = useState<Event>();
  const [published, setPublished] = useState<boolean>(false);
  const [cardImgURL, setCardImgURL] = useState('');
  const currentEvent = useAppSelector((state) => state.event.current);
  const queryString = router.query;

  useEffect(() => {
    const slug = queryString.eventSlug;

    if (slug != undefined && typeof slug === 'string') {
      setCurrentEventSlug(slug);
    }
  }, [queryString]);

  useEffect(() => {
    const tempCurrentEvent = currentEvent;

    if (tempCurrentEvent) {
      const tempPublished = tempCurrentEvent.published;
      const tempEvent = tempCurrentEvent.event;

      if (tempEvent?.Files) {
        tempEvent.Files.map((file) => {
          if (file.type === 'Cover') {
            const tempCoverURL = file.url;
            setCardImgURL(tempCoverURL);
          }
        });
      }

      if (tempEvent) setEvent(tempEvent);
      if (tempPublished) setPublished(tempPublished);
    }
  }, [currentEvent]);

  return (
    <div className="flex flex-col items-start py-4 sm:py-5 md:flex-row">
      <div className="block w-full md:w-3/6">
        <div className="flex flex-col">
          <Label className="flex items-center mb-4">
            <h3 className="section-title">
              {event?.title}
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {published ? 'Published' : 'Not Published'}
              </span>
            </h3>
          </Label>

          <div className="mb-8">
            <div className="mt-4 mr-2 text-sm">
              <span className="flex mb-1 text-base font-medium">
                Description:
                {!event?.description && (
                  <Button
                    onClick={() =>
                      currentEventSlug &&
                      Router.push(ROUTES.events.edit(currentEventSlug))
                    }
                    display="inline-flex"
                    padding="px-3 py-1.5 ml-auto mr-5"
                    width="w-fit"
                  >
                    Add description
                  </Button>
                )}
              </span>

              <span>{event?.description}</span>
            </div>
          </div>

          <CreateEventProcess />
        </div>
      </div>

      <div className="relative block w-full mt-4 md:w-3/6 md:mt-0">
        <div className="flex flex-row justify-start mb-4 gap-x-4 md:justify-end">
          {currentEvent?.hasPass ? (
            <Button
              type="button"
              onClick={() =>
                currentEventSlug &&
                Router.push(ROUTES.passCategory.view(currentEventSlug))
              }
              padding="px-4 py-2"
              width="w-fit"
            >
              Pass Tokens
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() =>
                currentEventSlug &&
                Router.push(ROUTES.passes.create(currentEventSlug))
              }
              padding="px-4 py-2"
              width="w-fit"
            >
              Create Pass
            </Button>
          )}

          <Button
            type="button"
            onClick={() =>
              currentEventSlug &&
              Router.push(ROUTES.events.edit(currentEventSlug))
            }
            bgColor="bg-black hover:bg-gray-700"
            padding="px-4 py-2"
            textProperties="text-sm text-white"
            width="w-fit"
          >
            Edit Event
          </Button>
        </div>

        {event && (
          <EventCard
            title={event.title}
            description={event.description}
            startDate={event.startDate}
            endDate={event.endDate}
            imgURL={cardImgURL}
          />
        )}
      </div>
    </div>
  );
};

export default EventDetails;
