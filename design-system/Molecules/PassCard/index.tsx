import { FaRupeeSign } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

import { Button } from '@/Atoms/Button';
import { Label } from '@/Atoms/Label';
import { Image } from '@/Atoms/Image';
import { Icon } from '@/Atoms/Icon';

type PassCardType = {
  // children: ;
  title: string;
  price?: number;
  passType: string;
};

const PassCard = ({ title, price, passType }: PassCardType) => {
  return (
    <div className="max-w-6xl px-4 mx-auto mt-10 sm:px-6 lg:px-6">
      <div className="relative flex flex-col items-center justify-start w-full bg-white border border-gray-300 rounded-lg shadow-sm sm:flex-row">
        <div className="float-right w-2/4 overflow-hidden ml-ayto sm:h-64 max-h-fit sm:rounded-l-lg">
          <Image
            src="/images/nftDummy/0(8).png"
            alt={''}
            // object-cover
            className="object-center w-full h-full "
          />
        </div>
        <div className="px-6 py-4 space-y-4">
          <Label className="w-full">
            <h3 className="text-lg font-bold lg:text-2xl">{title}</h3>
          </Label>
          <ul className="w-full text-left">
            <li className="text-sm">Institutional Digital Marketing Course</li>
            <li className="text-sm">Advanced Copywriting Course</li>
            <li className="text-sm">
              Lorem ipsum consectetur adipisicing elit.
            </li>
            <li className="text-sm">Advanced Copywriting Course</li>
            <li className="text-sm">Advanced Copywriting Course</li>
          </ul>

          <div className="flex items-center justify-start flex-shrink-0 space-x-2">
            {/*  border*/}
            <Button
              bgColor="bg-black hover:bg-gray-700"
              customClasses="disabled:opacity-50 transition-colors duration-300 ease-in-out focus:z-10 focus:outline-none focus:ring-1"
              display="relative inline-flex items-center justify-center "
              textProperties="whitespace-nowrap text-white text-sm font-medium"
              padding="px-4 py-2"
            >
              Join Now
            </Button>
            <Button
              bgColor="bg-white hover:bg-gray-50"
              customClasses=" border-gray-300 disabled:opacity-50 transition-colors duration-300 ease-in-out focus:z-10 focus:outline-none focus:ring-1"
              display="relative inline-flex items-center justify-center "
              textProperties="whitespace-nowrap text-gray-700 text-sm font-medium"
              padding="px-4 py-2"
            >
              More Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassCard;
/**
    <div
      className={`relative p-2 overflow-hidden transition-all border rounded-lg shadow-lg hover:-translate-y-2 dark:bg-primary-500 ${
        passType === 'gold' && 'bg-orange-50'
      }`}
    >
      {passType === 'gold' && (
        <div className="text-xl absolute px-16 py-3 uppercase rotate-45 bg-yellow-500 top-[6%] -right-[16%]">
          Best Value
        </div>
      )}
      <header className="plan-header">
        <Label className="mb-3 text-xl text-center text-yellow-400 uppercase">
          {title}
        </Label>
        <p className="flex items-center justify-center gapx-1">
          <FaRupeeSign />
          <span className="text-3xl">{price}</span>
        </p>
      </header>
      <div className="my-3">{children}</div>
      <Button
        bgColor="hover:bg-primary-400"
        customClasses="border-2 bg-transparent"
      >
        Buy
      </Button>
    </div>

*/
