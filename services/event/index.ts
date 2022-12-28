import axios from '@/services/index';
import { CreateEvent, UpdateEvent } from 'types/createEvent.type';

const createEvent = async (payload: CreateEvent) => {
  const EventData = payload;

  try {
    const response = await axios.post('/event', EventData);

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

const getMyEvents = async () => {
  try {
    const response = await axios.get('event/myEvents');

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

const getEventBySlug = async (slug: string) => {
  const queryString = slug;
  try {
    const response = await axios.get(`event/${queryString}`);

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

const updateEvent = async (eventId: number, payload: UpdateEvent) => {
  const Id = eventId;
  const UpdatedData = payload;

  try {
    const response = await axios.put(`/event/${Id}`, UpdatedData);

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

const deleteEvent = async (eventId: number) => {
  const Id = eventId;

  try {
    const response = await axios.delete(`/event/${Id}`);

    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

export { createEvent, getMyEvents, getEventBySlug, updateEvent, deleteEvent };
