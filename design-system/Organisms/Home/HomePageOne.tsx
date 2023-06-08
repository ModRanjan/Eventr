import React from 'react';
import { useRouter } from 'next/router';

import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';
import { CustomSaperator } from '@/Atoms/Saperator';

import { GridCards } from '@/Molecules/Cards/GridCards';
import { EventSearchHero } from '@/Molecules/Hero/EventSearch';
import { SimpleImageBanner } from '@/Atoms/Banner/SimpleImageBanner';

import { ROUTES } from '@/config/routes';

import { useAppSelector } from '@/redux/hooks';
import { toast } from 'react-toastify';

const LandingPage = () => {
  const Router = useRouter();
  const ContractEvents = useAppSelector((state) => state.event.contractEvents);

  const EventSearchHandler = () => {
    toast.warn(
      'sorry! we are facing some issue right now. Try after some time...',
    );
  };

  const ClickCardHandler = (eventId: number | string) => {
    console.log(eventId);
    if (typeof eventId == 'string')
      Router.push(ROUTES.overviews.eventDetails(eventId));
  };

  return (
    <>
      {/*  ==========BANNER==========  */}
      <section className="relative h-screen">
        <SimpleImageBanner imgSrc={'/images/banner/banner01.jpg'} />

        <div className="absolute inset-0 w-full h-screen max-w-6xl mx-auto my-auto space-y-6 font-sans text-center text-gray-100 mt-44 min-h-fit">
          <Label className="space-y-4 text-4xl font-extrabold leading-4 text-gray-100 uppercase sm:text-6xl lg:text-7xl font-OpenSans">
            Book Your
            <span className="block px-2 mt-4 sm:mt-6">
              Tickets For
              <span className=" text-[#31d7a9]">&nbsp;Events</span>
            </span>
          </Label>

          <p className="px-6 text-lg sm:text-3xl line-clamp-2 sm:line-clamp-1">
            Safe, secure, reliable ticketing. Your ticket to live entertainment!
          </p>
        </div>
      </section>

      {/*  ==========SAPERATOR==========  */}
      <CustomSaperator className="inline-block h-40 bg-gray-900 bg-opacity-20 sm:pt-40 mix-blend-darken" />

      {/* ==========EVENT SEARCH HERO========== */}
      <section className="relative w-full h-full py-5 sm:py-8 bg-[#001232] lg:py-12">
        <div className="inset-0 max-w-6xl mx-auto sm:absolute -top-40">
          <EventSearchHero searchButtonHandler={EventSearchHandler} />
        </div>

        <CustomSaperator className="inline-block h-20 sm:h-24" />
      </section>

      {/* ==========EVENTS========== */}
      <section className="relative w-full bg-[#001232]">
        <div className="max-w-6xl px-4 py-5 mx-auto sm:py-6 sm:px-6 font-OpenSans">
          <div className="flex justify-between my-8 border-b border-gray-500">
            <Label className="relative flex flex-col font-bold text-gray-200 ">
              <h2 className="pb-3 text-4xl uppercase sm:text-5xl">Events</h2>

              <span className="border-t-4 border-[#31d7a9] w-32"></span>
            </Label>

            <Button
              link={'/Overviews/Events'}
              type="button"
              customClasses="z-0 border-0 bg-transparrent px-6 py-2 rounded-3xl whitespace-nowrap text-lg text-[#31d7a9] font-semibold sm:w-fit h-fit my-auto cursor-pointer"
            >
              View All
            </Button>
          </div>

          <div className="pb-20">
            <GridCards
              onClickCardHandler={ClickCardHandler}
              cardData={ContractEvents}
              maxLimit={3}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
