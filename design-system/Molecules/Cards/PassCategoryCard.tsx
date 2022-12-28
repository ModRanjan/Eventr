import { FaRupeeSign } from 'react-icons/fa';

import { Icon } from '@/Atoms/Icon';
import { Image } from '@/Atoms/Image';
import { Label } from '@/Atoms/Label';
import { Button } from '@/Atoms/Button';

type PassCardType = {
  title: string;
  price?: number;
  passType: string;
  children?: JSX.Element;
};

/** pass with its category
 *
 */
export const PassCategoryCard = ({
  title,
  price,
  passType,
  children,
}: PassCardType) => {
  return (
    <div className="relative flex flex-col items-center justify-start w-full overflow-hidden bg-white border border-gray-400 rounded-lg shadow-sm hover:shadow-lg sm:flex-row h-fit">
      <div className="float-right w-full overflow-hidden sm:w-2/4 ml-ayto sm:h-64 max-h-fit sm:rounded-l-lg">
        <Image
          src={`https://i.seadn.io/gcs/files/89f0cd4457af5632e66fb44bf43309cd.png?auto=format&w=1920`}
          // src="/images/nftDummy/0(8).png"
          alt={title + 'pass'}
          className="object-center w-full h-full"
        />
      </div>

      <div className="flex-grow px-6 py-4 overflow-hidden">
        <div className="hidden sm:block text-xl absolute px-28 py-3 uppercase rotate-45 bg-yellow-500 top-[9%] -right-[16%]">
          Best Value
        </div>
        <Label className="flex flex-col items-center justify-center w-full">
          <h3 className="text-3xl font-semibold tracking-wide text-yellow-600 uppercase lg:text-2xl">
            {title}
          </h3>

          <div className="flex items-center justify-center">
            <Icon icon={FaRupeeSign} className="h-4" />
            <span className="text-2xl">{price}</span>
          </div>
        </Label>

        <div className="flex justify-between mt-2 text-left">
          <div className="flex flex-col flex-1">
            <h3 className="text-xs font-semibold uppercase">Event Name</h3>
            <span className="text-base text-gray-600">{'dummy-1'}</span>
          </div>
          <div className="flex flex-col flex-1">
            <h3 className="text-xs font-semibold uppercase">Pass Type</h3>
            <span className="text-base text-gray-600">{passType}</span>
          </div>
        </div>

        <div className="flex flex-col items-start mt-2">
          <h3 className="text-xs font-semibold uppercase">Ending In</h3>

          <div className="flex mt-1 text-base gap-x-2">
            <p className="flex flex-col items-center px-1 text-xs text-gray-500">
              <span className="text-base text-black ">15</span>
              {'days'}
            </p>
            <p className="flex flex-col items-center px-1 text-xs text-gray-500">
              <span className="text-base text-black ">05</span>
              {'hours'}
            </p>
            <p className="flex flex-col items-center px-1 text-xs text-gray-500 rounded">
              <span className="text-base text-black ">50</span>
              {'mins'}
            </p>
          </div>
        </div>
        {children}

        <div className="flex items-center justify-end flex-shrink-0 mt-2 gap-x-2">
          <Button
            display="relative inline-flex items-center justify-center "
            textProperties="whitespace-nowrap text-gray-700 text-sm font-medium"
            padding="px-4 py-2"
            width="w-fit"
          >
            More Details
          </Button>

          <Button
            bgColor="bg-black hover:bg-gray-700"
            display="relative inline-flex items-center justify-center "
            textProperties="whitespace-nowrap text-white text-sm font-medium"
            padding="px-4 py-2"
            width="w-fit"
          >
            Join Now
          </Button>
        </div>
      </div>
    </div>
  );
};
