import axios from '@/services/index';
import { CreateEvent } from 'types/createEvent.type';

const createEvent = async (payload: CreateEvent) => {
  const EventData = payload;

  try {
    const response = await axios.post('/event', EventData);

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

const getMyEvent = async () => {
  try {
    const response = await axios.get('event/myEvents');

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

export { createEvent, getMyEvent };
