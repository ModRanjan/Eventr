import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';

import { Icon } from '@/Atoms/Icon';
import { Image } from '@/Atoms/Image';
import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

interface EventSearchHeroProps {
  searchButtonHandler: () => void;
}

export const EventSearchHero = ({
  searchButtonHandler,
}: EventSearchHeroProps) => {
  return (
    <div className="px-4 mx-auto bg-transparent sm:px-6 min-h-fit h-96 sm:h-80">
      <div className="relative mx-auto overflow-hidden">
        <Image
          src={'/images/bg02.jpg'}
          alt="bg02"
          className={`object-cover object-center w-full opacity-90 sm:h-72 h-96`}
        />

        <div className="absolute inset-0 overflow-hidden sm:h-80 h-96">
          <div className="bg-gradient-to-r from-[#0f5ae0]/75 to-[#7400ba]/75 py-6 sm:py-8 px-4 sm:px-6 lg:px-8  min-h-full">
            <div className="flex flex-col w-full gap-y-6 sm:justify-between sm:flex-row">
              <Label className="flex-1 space-y-2 text-center sm:text-left sm:mb-6 font-OpenSans">
                <h2 className="text-lg text-[#31d7a9] uppercase font-medium">
                  WELLCOME TO EVENTR
                </h2>

                <h2 className="text-xl font-semibold text-white sm:text-[28px]">
                  WHAT ARE YOU LOOKING FOR
                </h2>
              </Label>
            </div>

            <div className="relative flex flex-col items-center w-full px-6 py-4 mt-10 overflow-hidden border-black justify-evenly border-y sm:h-24 min-h-min sm:flex-row lg:p-8 gap-y-6">
              <div className="absolute inset-0 bg-[rgb(26,26,26)] mix-blend-normal opacity-40 " />

              {/* SEARCH-BOX*/}
              <div className="z-0 flex items-center max-w-lg text-gray-400 border-b border-gray-400">
                <input
                  type="text"
                  placeholder="Search for Events"
                  className="flex-1 inline-block bg-transparent h-fill py-1.5 outline-none outline-0 border-none focus:outline-none focus:ring-0"
                />

                <Button
                  onClick={searchButtonHandler}
                  customClasses="bg-transparent border-0 inline-flex px-2 py-3 w-full h-full cursor-pointer"
                >
                  <Icon icon={BiSearch} className="inline-block w-5" />
                </Button>
              </div>

              {/* DROPDOWNS */}
              <div className="z-10 inline-flex flex-col items-start self-center w-full gap-4 mx-auto sm:flex-row gap-x-6 sm:ml-auto sm:justify-self-end sm:gap-x-8 lg:gap-x-12 sm:w-auto">
                <div className="inline-flex items-center gap-x-3">
                  <Image
                    src="/images/city.png"
                    alt="date"
                    className="rounded-full"
                  />
                  <span className="text-[#31d7a9]">City</span>
                  <Button customClasses="px-4 text-gray-300 bg-transparrent">
                    Ahmedabad
                    <Icon icon={BsChevronDown} className="inline-block ml-2" />
                  </Button>
                </div>

                <div className="inline-flex items-center gap-x-3">
                  <Image
                    src="/images/date.png"
                    alt="date"
                    className="rounded-full"
                  />
                  <span className="text-[#31d7a9]">Date</span>
                  <Button customClasses="px-4 text-gray-300 bg-transparrent">
                    23/10-2023
                    <Icon icon={BsChevronDown} className="inline-block ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
