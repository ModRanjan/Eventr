import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { Card } from '@/Atoms/Card';
import { NoRecord } from '@/Molecules/NoRecord';

import { ROUTES } from '@/config/routes';
import { Label } from '@/Atoms/Label';

import getAllEventData from '@/flow/scripts/get_allEventData';
import { IDeployedEvent } from '@/redux/event/types';

type ContractEventsType = {
  className: string;
};

const ContractEvents = ({ className }: ContractEventsType) => {
  const Router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allContractEvent, setAllContractEvent] = useState<IDeployedEvent[]>(
    [],
  );

  useEffect(() => {
    const getAllContractEvent = async () => {
      setLoading(true);

      try {
        const eventData = await getAllEventData();
        const tempEventData = eventData.map((eventData: any) => {
          const { eventID, eventName, metadata } = eventData;

          return {
            eventId: eventID,
            profileURL: metadata.profileUrl,
            coverURL: metadata.coverUrl,
            eventName: eventName,
            startDate: new Date(Number(metadata.startTimeStamp)).toDateString(),
            endDate: new Date(Number(metadata.endTimeStamp)).toDateString(),
            description: metadata.description,
            passType: metadata.passType,
            dropType: metadata.dropType,
          };
        });

        setAllContractEvent(tempEventData);
        setLoading(false);
      } catch (error: any) {
        console.log('GetContractEvents Error: ', error.message);
        toast.error(error.message);
      }
    };

    getAllContractEvent();
  }, []);

  if (allContractEvent.length < 1) {
    return (
      <div className="-mt-5">
        <NoRecord buttonTitle="Create Event" message="Sorry! no-events found" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen mt-5">
        <div className="p-12 text-center border-2 border-gray-300 rounded-lg">
          <Label className="my-8 text-2xl font-semibold text-gray-500">
            <span>Loding ...</span>
          </Label>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {allContractEvent.map((event: IDeployedEvent) => {
        return (
          <Card
            onClick={() => Router.push(ROUTES.deployed.view(event.eventId))}
            key={event.eventName + event.eventId}
            slug={event.eventId.toString()}
            title={event.eventName}
            imgURL={event.coverURL}
            description={event.description}
            startDate={event.startDate}
            endDate={event.endDate}
          />
        );
      })}
    </div>
  );
};

export default ContractEvents;
