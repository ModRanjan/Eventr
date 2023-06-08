import { useEffect, useState } from 'react';
import Router from 'next/router';

import { NoRecord } from '@/Molecules/NoRecord';
import { SimpleEventCard } from '@/Molecules/Cards/SimpleEventCard';

import { Event } from '@/redux/event/types';

import { ROUTES } from '@/config/routes';

type AllEventsType = {
  events: Event[];
  className: string;
};

export const AllEvents = ({ events, className }: AllEventsType) => {
  const [allEvent, setAllEvent] = useState<Event[]>([]);

  useEffect(() => {
    const tempEvents = events;
    setAllEvent(tempEvents);
  }, [events]);

  if (allEvent.length < 1) {
    return (
      <div className="-mt-5">
        <NoRecord
          buttonTitle="Create Event"
          message="Sorry! You have no-events..."
          onClick={() => Router.push(ROUTES.events.create())}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      {allEvent.map((event: Event) => {
        return (
          <SimpleEventCard
            onClick={() => Router.push(ROUTES.events.view(event.slug))}
            key={event.title + event.slug}
            slug={event.slug}
            title={event.title}
            description={event.description}
            startDate={event.startDate}
            endDate={event.endDate}
            published={event.published}
          />
        );
      })}
    </div>
  );
};
