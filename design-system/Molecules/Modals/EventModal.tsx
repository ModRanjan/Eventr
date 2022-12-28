import { useEffect, useState } from 'react';
import { HiOutlineXCircle } from 'react-icons/hi';

import { Icon } from '@/Atoms/Icon';
import { Label } from '@/Atoms/Label';
import { Image } from '@/Atoms/Image';
import { Button } from '@/Atoms/Button';
import { CustomModal } from '@/Atoms/Modal/CustomModal';

import { CreateEvent, UpdateEvent } from 'types/createEvent.type';

type EventModalProps = {
  eventData: CreateEvent | UpdateEvent;
  eventId?: number;
  handleCloseModal: () => void;
  isModalOpen: boolean;
  modalTitle: string;
  createEvent?: (eventData: CreateEvent) => void;
  updateEvent?: (eventId: number, eventData: UpdateEvent) => void;
};

export const EventModal = ({
  handleCloseModal,
  modalTitle,
  eventId,
  isModalOpen,
  eventData,
  createEvent,
  updateEvent,
}: EventModalProps) => {
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [currentEventId, setCurrentEventId] = useState<number>();

  useEffect(() => {
    const tenpStartDate = eventData.startDate;
    const tenpEndDate = eventData.endDate;
    const formatedStartDate = new Date(tenpStartDate).toDateString();
    const formatedEndDate = new Date(tenpEndDate).toDateString();

    if (formatedStartDate) {
      setStartDate(formatedStartDate);
    }
    if (formatedEndDate) {
      setEndDate(formatedEndDate);
    }
    if (eventId) {
      setCurrentEventId(eventId);
    }
  }, [eventData, eventId]);

  const onCreateUpdateHandler = () => {
    if (createEvent) createEvent(eventData);

    if (updateEvent && currentEventId) updateEvent(currentEventId, eventData);
  };

  return (
    <CustomModal
      open={isModalOpen}
      handleCloseModal={handleCloseModal}
      label={modalTitle}
      width="sm:max-w-3xl w-full max-w-sm lg:max-w-4xl"
      height="h-fit"
    >
      <Label className="flex justify-between w-full pb-2 text-3xl font-medium text-left border-b border-gray-400 sm:px-4 lg:px-8">
        <h3 className="flex text-lg font-Roboto md:text-xl">
          Event Created Details
        </h3>

        <Button
          onClick={handleCloseModal}
          type="button"
          bgColor="border-0"
          padding="px-0 py-0 -mr-1"
          textProperties="text-sm text-gray-500 hover:text-gray-900"
          width="w-fit"
        >
          <Icon className="h-6 w-9" icon={HiOutlineXCircle} />
        </Button>
      </Label>

      <div className="block w-full px-6 py-5 mb-3 overflow-y-auto sm:px-8 max-h-72">
        <div className="flex flex-col justify-center w-full space-y-6">
          <div className="flex flex-col flex-1">
            <span className="text-xs font-medium uppercase">Event Name</span>

            <span className="text-base text-gray-500">{eventData.title}</span>
          </div>

          <div className="flex flex-col flex-1">
            <span
              className="text-xs font-medium uppercase"
              title={eventData.description}
            >
              Description
            </span>

            <span className="text-base text-gray-500">
              {eventData.description && eventData.description?.length > 100
                ? eventData.description?.slice(0, 100) + '... '
                : eventData.description}
            </span>
          </div>

          <div className="flex justify-between gap-x-3">
            <div className="flex flex-col flex-1">
              <span className="text-xs font-medium uppercase">start date:</span>

              <span className="text-base text-gray-500">{startDate}</span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-xs font-medium uppercase">end Date:</span>

              <span className="text-base text-gray-500">{endDate}</span>
            </div>
          </div>
          <div className="flex justify-between gap-x-3">
            {eventData.cover && (
              <div className="flex flex-col flex-1">
                <span className="text-xs font-medium uppercase">cover:</span>

                <span className="text-base text-gray-500">
                  <Image
                    src={eventData.cover?.url}
                    alt={'eventCoverIMG'}
                    className="w-full rounded-md h-52"
                  />
                </span>
              </div>
            )}
            {eventData.profile && (
              <div className="flex flex-col flex-1">
                <span className="text-xs font-medium uppercase">profile:</span>

                <span className="text-base text-gray-500">
                  <Image
                    src={eventData.profile?.url}
                    alt={'eventProfileIMG'}
                    className="w-full rounded-md h-52"
                  />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Button
        type="button"
        onClick={onCreateUpdateHandler}
        bgColor="bg-black hover:bg-gray-700"
        display="inline-flex justify-self-end"
        padding="px-3 py-2.5 ml-auto mr-4 sm:mr-8"
        textProperties="text-sm text-white leading-4"
        width="w-fit"
      >
        {modalTitle}
      </Button>
    </CustomModal>
  );
};
