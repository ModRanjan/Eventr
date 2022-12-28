import { useEffect, useState } from 'react';
import { timeDifference } from '@/utils/GeneralFunctions';

type EventCardProps = {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  imgURL?: string;
};

export const EventCard = ({
  title,
  description,
  startDate,
  endDate,
  imgURL,
}: EventCardProps) => {
  const [startDateFormat, setStartDateFormat] = useState<string>();
  const [endDateFormat, setEndDateFormat] = useState<string>();

  useEffect(() => {
    let formatedStartDate = new Date(startDate).toDateString();
    let formatedEndDate = new Date(endDate).toDateString();
    // let tempformatedEndDate = new Date(endDate).getTime();
    // const time = timeDifference(tempformatedEndDate);
    // console.log('endDate:', tempformatedEndDate);
    // console.log('time remaining:', time);
    setStartDateFormat(formatedStartDate);
    setEndDateFormat(formatedEndDate);
  }, [title, startDate, endDate, imgURL]);

  return (
    <div className="flex items-center px-6 py-5 mt-8 space-x-3 bg-white border border-gray-400 rounded-lg shadow-sm hover:shadow-lg">
      <div className="block w-full text-black">
        <div className="flex flex-col w-full border border-black">
          <div className="flex justify-between p-4">
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase">Title</h4>
              <span className="text-3xl font-black">{title}</span>
            </div>
          </div>

          <div className="flex justify-center border-t border-b border-black">
            <div className="w-full p-4">
              <div className="mb-2 text-xs font-bold uppercase">Start Date</div>
              <h2 className="text-2xl font-black">{startDateFormat}</h2>
            </div>

            <div className="w-full p-4 border-l border-black">
              <div className="mb-2 text-xs font-bold uppercase">End Date</div>
              <h2 className="text-2xl font-black">{endDateFormat}</h2>
            </div>
          </div>

          {imgURL && (
            <div className="p-4">
              <img
                src={imgURL}
                alt={title}
                className="object-cover w-full mb-2 max-h-80"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
