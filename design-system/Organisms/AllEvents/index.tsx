import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Card } from '@/Atoms/Card';
import { Label } from '@/Atoms/Label';

import axios from '@/utils/Axios';
import { event } from '@/redux/event/types';

export interface myEvent {
  slug: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  profileURL: string;
  coverURL: string;
}

export const AllEvents = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState<myEvent[]>();

  const getMyEvents = async () => {
    setLoading(true);
    let tempEventData: myEvent[] = [];
    let MyEventData: myEvent;

    axios
      .get('event/myEvents')
      .then((response) => {
        const responseData = response.data.data;

        responseData.map((item: event) => {
          if (item) {
            MyEventData = {
              slug: item.slug,
              title: item.title,
              description: item.description,
              startDate: item.startDate,
              endDate: item.endDate,
              profileURL: item.Files[0].url,
              coverURL: item.Files[1].url,
            };
          }
          if (MyEventData) {
            tempEventData.push(MyEventData);
          }
          setEventData(tempEventData);
        });
      })
      .catch((error) => {
        console.log('Error in getting myEvents Data:', error);
      });
    setLoading(false);
  };

  useEffect(() => {
    getMyEvents();
  }, []);

  const eventDetail = (slug: number) => {
    router.push('/Events/' + slug);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Label className="my-8 text-2xl font-semibold text-gray-500">
          Loding ...
        </Label>
      </div>
    );
  }

  if (eventData === undefined || eventData.length < 0) {
    return (
      <div className="flex items-center justify-center h-80 max-h-80">
        <Label className="text-xl font-medium text-gray-500 my-18">
          You have no-events
        </Label>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {eventData &&
        eventData.map((item, index) => {
          return (
            <Card
              onClick={() => eventDetail(item.slug)}
              key={item.title + index}
              title={item.title}
              profileUrl={item.profileURL}
              name={item.title}
              description={item.description}
            />
          );
        })}
    </div>
  );
};
