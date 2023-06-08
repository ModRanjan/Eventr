import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { FaRegClock, FaRupeeSign } from 'react-icons/fa';

import { Icon } from '@/Atoms/Icon';
import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

type GridBannerPropsType = {
  scrollToSection: (elementRef: React.RefObject<HTMLElement>) => void;
  tokenRef: React.RefObject<HTMLElement>;
  eventName: string;
  description: string;
  imgUrl: string;
  startingPrice: number;
  startDate: string;
  maxTokenCount: number;
};

export const GridBanner = ({
  scrollToSection,
  tokenRef,
  eventName,
  description,
  imgUrl,
  startingPrice,
  startDate,
  maxTokenCount,
}: GridBannerPropsType) => {
  const [formatedStartDate, setFormatedStartDate] = useState<string>();

  useEffect(() => {
    let formatedStartDate = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date(Number(startDate)));

    setFormatedStartDate(formatedStartDate);
  }, [startDate]);

  return (
    <main className="relative w-full mx-auto overflow-hidden">
      <div>
        <img
          className="object-cover object-center sm:object-right w-screen h-[480px]"
          src={imgUrl}
          alt={eventName}
        />

        {/* <div className="absolute inset-0 bg-[rgb(26,26,26)] mix-blend-plus-lighter" /> */}
        <div className="absolute inset-0 bg-[rgb(26,26,26)] mix-blend-screen" />
      </div>

      <div className="absolute inset-0">
        <div className="lg:relative w-screen bg-gradient-to-r from-[rgb(25,25,25)] to-transparent">
          <div className="grid max-w-md mx-auto sm:max-w-3xl lg:max-w-7xl content-center h-[480px] sm:grid-cols-12 px-4 sm:px-6 lg:px-8 py-5 sm:py-10">
            <div className="hidden w-full col-span-3 overflow-hidden rounded-lg lg:block justify-self-center aspect-w-1">
              <img
                src={imgUrl}
                alt={eventName}
                className="object-cover object-center w-auto min-w-0 rounded-lg h-96"
              />
            </div>

            <div className="col-span-12 px-4 sm:px-0 justify-self-center sm:col-span-6 lg:col-span-5 xl:col-span-4 md:pl-6 sm:text-left">
              <div className="flex flex-col items-center w-full space-y-4 sm:items-start lg:text-left">
                <Label className="text-3xl font-bold tracking-tight text-white font-Roboto sm:text-4xl lg:text-6xl">
                  <span className="block">{eventName}</span>
                </Label>

                <div className="min-h-[100px]">
                  <h3 className="hidden mb-1 text-sm font-semibold text-gray-200 uppercase sm:block">
                    Description
                  </h3>

                  <p className="text-lg font-normal leading-5 text-center text-white sm:leading-5 sm:text-left font-Roboto lg:text-xl first-letter:capitalize line-clamp-3">
                    {description}
                  </p>
                </div>
                <div className="flex flex-col mt-10">
                  <li className="text-base text-gray-200 justify-self-center sm:text-xl lg:text-lg">
                    Limited Editions
                  </li>

                  <li className="text-gray-200 justify-self-center">
                    Remaning Number of Tokens &nbsp;
                    <span className="text-base text-yellow-500 sm:text-xl lg:text-lg">
                      {maxTokenCount}
                    </span>
                  </li>

                  <li className="text-gray-200 justify-self-center">
                    Starting Price&nbsp;
                    <Icon
                      icon={FaRupeeSign}
                      className="inline-block w-5 h-5 text-yellow-500"
                    />
                    <span className="text-base sm:text-lg lg:text-xl">
                      {startingPrice}
                    </span>
                  </li>
                </div>

                <div className="flex flex-col items-center mt-10 text-left md:flex-row sm:mt-0">
                  <p className="inline-flex items-center self-center p-1 pr-2 text-slate-100">
                    <Icon
                      icon={FaRegClock}
                      className="w-5 h-5 mr-2 text-yellow-500"
                    />
                    <time
                      className="text-base sm:text-lg lg:text-xl"
                      dateTime={'2021-03-24'}
                    >
                      {formatedStartDate}
                    </time>
                  </p>
                </div>

                <div className="mt-auto sm:self-start">
                  <Button
                    type="button"
                    onClick={() => scrollToSection(tokenRef)}
                    customClasses="bg-black                       inline-flex items-center p-1 pr-2 rounded-full text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base"
                  >
                    <span className="rounded-full bg-indigo-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                      Live now
                    </span>
                    <span className="ml-4 text-sm">view tokens</span>
                    <Icon
                      icon={FiChevronRight}
                      className="w-5 h-5 ml-2 text-yellow-500"
                    />
                  </Button>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
