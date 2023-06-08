import React from 'react';

import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';
import { Image } from '@/Atoms/Image';

const SubscribeHero = () => {
  return (
    <div className="relative w-full max-w-6xl min-h-full px-4 mx-auto overflow-hidden">
      <Image
        className="object-cover object-center w-full rounded-3xl h-80 sm:h-80"
        src={'/images/newslatter/bg01.jpg'}
        alt={'bg01.jpg'}
      />

      <div className="absolute inset-0 px-4 mx-auto overflow-hidden h-80 sm:h-80 z-1">
        <div className="rounded-3xl bg-gradient-to-r from-[#7400ba]/75 to-[#0f5ae0]/75 h-80 sm:h-80"></div>
      </div>

      <div className="absolute inset-0 flex items-center max-w-4xl px-4 mx-auto sm:px-6">
        <div className="w-full max-w-lg px-4 mx-auto text-center text-gray-200 sm:max-w-xl font-OpenSans">
          <Label className="mb-3 sm:mb-4 text-xl text-[#31d7a9] font-semibold uppercase sm:text-2xl">
            Subscribe to Eventr
          </Label>

          <h2 className="mb-8 text-2xl font-semibold uppercase sm:mb-12 md:text-4xl">
            TO GET EXCLUSIVE BENIFITS
          </h2>

          <div className="flex w-full overflow-hidden border border-purple-400 border-opacity-30 rounded-3xl">
            <input
              type="text"
              placeholder="Your Email Address"
              className="inline-block flex-1  py-2.5 px-2 sm:px-6 text-base sm:text-lg text-left border-none outline-none bg-transparent text-gray-400"
            />
            <Button
              type="submit"
              customClasses="inline-block whitespace-nowrap text-gray-400 text-base rounded-3xl bg-gradient-to-r from-red-500 via-pink-500 via-purple-500 to-indigo-500 hover:bg-gray-900 px-4 sm:px-10 w-fit"
            >
              Subcribe
            </Button>
          </div>

          <p className="mt-6 text-lg font-thin text-center font-OpenSans line-clamp-2">
            We respect your privacy, so we never share your info
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscribeHero;
