import { FC } from 'react';

import { Button } from '@/Atoms/Button';
import { Image } from '@/Atoms/Image';
import { Label } from '@/Atoms/Label';
import { CustomSaperator } from '@/Atoms/Saperator';
import { SocialNavigation } from '@/Atoms/SocialNavigation';
import { IDeployedEvent } from '@/redux/event/types';

interface EventDetailsProps {
  eventDetails?: IDeployedEvent;
  BookTicketHandler: () => void;
}

export const EventDetailsHero: FC<EventDetailsProps> = ({
  eventDetails,
  BookTicketHandler,
}) => {
  return (
    <div className="relative max-w-6xl mx-auto overflow-hidden ">
      <Image
        src={'/images/bg02.jpg'}
        alt="bg02"
        className={`object-cover object-center w-full opacity-90 sm:h-64 h-[500px]`}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#0f5ae0]/75 to-[#7400ba]/75 py-4 sm:py-10 px-4 sm:px-6 lg:px-8 h-[500px]" />

      <div className="absolute inset-0 overflow-hidden sm:h-64 h-[500px] sm:px-6">
        <div className="flex flex-col w-full gap-6 py-6 lg:py-8 sm:justify-center">
          <div className="flex flex-col gap-6 text-center sm:flex-row">
            <Label className="text-2xl font-bold leading-9 text-center text-white uppercase sm:text-[28px] sm:text-left font-OpenSans flex-1">
              {eventDetails?.eventName}
            </Label>

            <div className="flex flex-col px-4 text-white font-OpenSans gap-x-10 sm:flex-row gap-y-6">
              <div className="flex items-center justify-center text-2xl sm:text-3xl gap-x-4 sm:justify-evenly">
                <li className="list-none">
                  <h2 className="text-2xl sm:text-3xl">12</h2>
                  <p className="text-base sm:text-[16px] mt-1 text-slate-400">
                    DAYS
                  </p>
                </li>
                {':'}

                <li className="list-none">
                  <h2 className="text-2xl sm:text-3xl">25</h2>
                  <p className="text-base sm:text-[16px] mt-1 text-slate-400">
                    HOURS
                  </p>
                </li>
                {':'}
                <li className="list-none">
                  <h2 className="text-2xl sm:text-3xl">23</h2>
                  <p className="text-base sm:text-[16px] mt-1 text-slate-400">
                    MIN
                  </p>
                </li>
                {':'}
                <li className="list-none">
                  <h2 className="text-2xl sm:text-3xl">25</h2>
                  <p className="text-base sm:text-[16px] mt-1 text-slate-400">
                    SEC
                  </p>
                </li>
              </div>

              <Button
                onClick={BookTicketHandler}
                type="button"
                bgColor="rounded-3xl bg-gradient-to-r from-red-500 via-pink-500 via-purple-500 to-indigo-500 hover:bg-gray-900"
                border="border-0"
                rounded="rounded-2xl"
                padding="px-3 py-2 sm:px-6 sm:py-3 my-auto"
                textProperties="text-base uppercase text-white"
                width="w-full sm:w-fit h-fit"
              >
                Book Tickets
              </Button>
            </div>
          </div>

          <CustomSaperator className="my-2 border-b border-purple-500 border-opacity-50 sm:my-5" />

          <div className="flex flex-col items-center justify-between gap-6 sm:gap-x-8 sm:flex-row">
            <div className="flex flex-col px-4 gap-x-8 gap-y-4 sm:flex-row sm:px-0">
              <div className="flex items-center text-sm gap-x-2 text-slate-300">
                <Image
                  src={'/images/event/icon/event-icon01.png'}
                  alt="event-icon"
                  className="inline-block w-11 h-11"
                />

                <p className="mt-0 text-left line-clamp-2">
                  3 Days (Friday-Sunday) 70+ Workshops
                </p>
              </div>
              <div className="flex text-sm gap-x-2 text-slate-300">
                <Image
                  src={'/images/event/icon/event-icon02.png'}
                  alt="event-icon"
                  className="inline-block w-11 h-11"
                />

                <p className="mt-0 text-left line-clamp-2">
                  17 South Sherman Street Astoria, NY 11106
                </p>
              </div>
              <div className="flex text-sm gap-x-2 text-slate-300">
                <Image
                  src={'/images/event/icon/event-icon03.png'}
                  alt="event-icon"
                  className="inline-block w-11 h-11"
                />

                <p className="mt-0 text-left line-clamp-2">
                  Drop us a line: Hello@Boleto .com
                </p>
              </div>
            </div>

            <SocialNavigation />
          </div>
        </div>
      </div>
    </div>
  );
};
