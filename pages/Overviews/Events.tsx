import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { Image } from '@/Atoms/Image';
import { Label } from '@/Atoms/Label';
import { CustomSaperator } from '@/Atoms/Saperator';

import { GridCards } from '@/Molecules/Cards/GridCards';
import { EventSearchHero } from '@/Molecules/Hero/EventSearch';
import { ROUTES } from '@/config/routes';
import { useAppSelector } from '@/redux/hooks';
import { toast } from 'react-toastify';

const MAX_LIMITS = [3, 9, 12, 18, 24];
const SHORT_BY = ['Live', 'Exclusive', 'Trending'];

const Events = () => {
  const Router = useRouter();
  const maxLimitRef = useRef<HTMLSelectElement>(null);
  const shortByRef = useRef<HTMLSelectElement>(null);
  const [maxLimit, setMaxLimit] = useState<number>(3);
  const [ShortBy, setShortBy] = useState<string>('Live');
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

  const MaxLimitHandler = () => {
    const Current = maxLimitRef?.current;

    if (Current) {
      const selectedValue = Current.value;
      setMaxLimit(Number(selectedValue));
    }
  };
  const ShortByHandler = () => {
    const Current = shortByRef?.current;

    if (Current) {
      const selectedValue = Current.value;
      setShortBy(selectedValue);
    }
  };

  return (
    <>
      {/*  ==========BANNER==========  */}
      <section className="w-full overflow-hidden h-[520px]">
        <div className="absolute inset-0 aspect-w-7 aspect-h-2 aspect-auto">
          <Image
            src={'/images//banner/banner02.jpg'}
            alt={'banner02'}
            className="object-cover object-center h-full overflow-hidden w-fit opacity-30"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#001232] bg-opacity-60"></div>

        <div className="absolute inset-0 w-auto h-full max-w-lg px-4 mx-auto space-y-6 overflow-hidden text-center text-gray-100 sm:max-w-4xl mt-60 sm:px-6 lg:px-8">
          <Label className="block space-y-4 text-4xl font-extrabold text-gray-100 uppercase sm:text-6xl lg:text-7xl font-OpenSans">
            Get
            <span className="px-2 text-[#31d7a9]">Events</span>
            Tickets
          </Label>

          <p className="max-w-3xl px-6 mx-auto text-lg leading-8 sm:text-3xl line-clamp-2">
            By Event tickets in advanse, find event times, details and much more
          </p>
        </div>
      </section>

      {/* ==========EventSearchHero========== */}
      <section className="relative w-full h-full bg-[#001232] pb-5 sm:pb-8 lg:pb-12">
        <div className="absolute inset-0 max-w-6xl mx-auto -top-14 h-96 sm:h-80">
          <EventSearchHero searchButtonHandler={EventSearchHandler} />
        </div>

        <CustomSaperator className="inline-block h-64 sm:h-48" />
      </section>

      {/* ==========EVENTS========== */}
      <div className="relative w-full bg-[#001232]">
        <div className="max-w-6xl px-4 py-5 mx-auto sm:py-6 sm:px-6 font-OpenSans">
          <div className="flex flex-col sm:flex-row sm:justify-between px-4 py-4 my-8 mb-12 border border-[#a3b1c627] rounded-md sm:px-6 lg:px-8 gap-y-4">
            <div className="relative flex items-center text-gray-200 gap-x-4 sm:gap-x-6">
              <h4 className="text-lg font-normal font-Roboto whitespace-nowrap">
                Show :
              </h4>

              <select
                ref={maxLimitRef}
                onClick={MaxLimitHandler}
                className="px-8 py-1.5 sm:py-2.5 cursor-pointer bg-[#001232] rounded-full w-full sm:w-fit form-select"
              >
                {MAX_LIMITS.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="relative flex items-center text-gray-200 gap-x-4 sm:gap-x-6">
              <h4 className="text-lg font-normal whitespace-nowrap font-Roboto">
                Short By :
              </h4>
              <select
                ref={shortByRef}
                onClick={ShortByHandler}
                className="px-8 py-1.5 sm:py-2.5 cursor-pointer bg-[#001232] rounded-full w-full sm:w-fit form-select"
              >
                {SHORT_BY.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          {/* <div className="pb-20"> */}
          <GridCards
            onClickCardHandler={ClickCardHandler}
            cardData={ContractEvents}
            maxLimit={maxLimit}
          />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Events;
