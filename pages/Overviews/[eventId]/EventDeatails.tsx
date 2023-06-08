'use client';
import React, { useEffect, useState } from 'react';

import { Data } from '@/Atoms/Stats';
import { Label } from '@/Atoms/Label';
import { Image } from '@/Atoms/Image';
import { CustomSaperator, SimpleSaperator } from '@/Atoms/Saperator';

import { Container } from '@/Atoms/Container';
import { Button } from '@/Atoms/Button';

import { Statistics } from '@/Molecules/Statistics';
import { EventDetailsHero } from '@/Molecules/Hero/EventDetailsHero';

import { useRouter } from 'next/router';
import { ROUTES } from '@/config/routes';

import { useAppSelector } from '@/redux/hooks';
import { IDeployedEvent } from '@/redux/event/types';

const stats: Data[] = [
  {
    name: 'Total Tickets',
    stat: '897',
    imgSrc: '/images/statistics/stat01.png',
  },
  {
    name: "Ticket's Booked",
    stat: '58',
    imgSrc: '/images/statistics/stat01.png',
  },
  {
    name: "Ticket's Left",
    stat: '24',
    imgSrc: '/images/statistics/stat02.png',
  },
];

const EventDeatails = () => {
  const Router = useRouter();
  const ContractEvents = useAppSelector((state) => state.event.contractEvents);
  const [CurrentEventId, setCurrentEventId] = useState<string>('');
  const [CurrentEvent, setCurrentEvent] = useState<IDeployedEvent>();

  useEffect(() => {
    const queryString = Router.query;
    const { eventId } = queryString;
    if (typeof eventId === 'string') setCurrentEventId(eventId);
  }, [Router.query]);

  useEffect(() => {
    const tempCurrentEvent = ContractEvents?.find(
      (Event) => Event.eventId === CurrentEventId,
    );

    setCurrentEvent(tempCurrentEvent);
  }, [ContractEvents]);

  const BookTicketHandler = () => {
    if (CurrentEventId)
      Router.push(ROUTES.overviews.eventTickets(CurrentEventId));
  };

  return (
    <>
      <section className="py-44 bg-[#001232]">
        <Image
          src={'/images/banner/banner06.jpg'}
          alt={'banner08'}
          className="absolute inset-0 object-center object-cover w-full overflow-hidden opacity-50 h-[480px]"
        />
      </section>

      {/*   ==========EVENT SEARCH HERO  ========== */}
      <section className="relative z-[10] -mt-28">
        <EventDetailsHero
          eventDetails={CurrentEvent}
          BookTicketHandler={BookTicketHandler}
        />
      </section>

      {/*  ==========SAPERATOR==========  */}
      <SimpleSaperator height="h-14" />

      {/*  ==========ABOUT EVENT==========  */}
      <section className="relative w-full h-full bg-[#001232] py-6 sm:py-10 lg:py-16">
        <Container className="mb-12">
          <div className="grid content-center grid-cols-1 sm:grid-cols-5">
            <div className="order-last col-span-3 px-4 sm:order-first sm:px-6 lg:px-8">
              <Label className="mb-4 text-[#31d7a9] text-xl sm:text-2xl font-OpenSans">
                ARE YOU READY TO ATTEND?
              </Label>
              <h2 className="mb-5 text-3xl font-bold text-white sm:text-5xl">
                {CurrentEvent?.eventName}
              </h2>
              <p className="pr-4 mb-6 text-lg leading-8 text-white sm:text-left sm:mb-8 lg:mb-12 font-OpenSans min-h-62">
                {CurrentEvent?.description}
              </p>

              <Button
                onClick={BookTicketHandler}
                customClasses="uppercase whitespace-nowrap text-white text-base rounded-3xl bg-gradient-to-r from-red-500 via-pink-500 via-purple-500 to-indigo-500 px-4 py-2 sm:px-8 sm:py-3 w-fit"
              >
                BOOK TICKETS
              </Button>
            </div>

            <div className="col-span-2 px-2 py-10 pl-10 sm:px-12">
              <div className="w-full bg-gradient-to-b from-red-500 via-purple-600 to-indigo-600 h-[400px] p-3">
                <div className="relative bg-[#001232] h-[378px]">
                  <Image
                    src={
                      CurrentEvent?.coverURL ??
                      'https://pixner.net/boleto/demo/assets/images/event/event-about.jpg'
                    }
                    alt={CurrentEvent?.eventName}
                    className="absolute -inset-y-10 -left-10 sm:-inset-y-12 sm:-left-12 h-[400px] w-96"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/*  ==========STATISTICS========== */}
      <Statistics statsData={stats} />
    </>
  );
};

export default EventDeatails;
