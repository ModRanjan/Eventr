import { FormEventValues } from '@/Molecules/Forms/EventForm/type';
import { CreateEvent, UpdateEvent } from 'types/createEvent.type';

export const getEventCreateValues = (values: FormEventValues) => {
  const tempEvent: CreateEvent = {
    title: values.title,
    startDate: values.startDate,
    endDate: values.endDate,
  };

  if (values.description) {
    tempEvent.description = values.description;
  }

  if (values.profileURL) {
    tempEvent.profile = {
      url: values.profileURL,
      size: 50,
      mimeType: 'image',
      extension: '.png',
    };
  }

  if (values.coverURL) {
    tempEvent.cover = {
      url: values.coverURL,
      size: 50,
      mimeType: 'image',
      extension: '.png',
    };
  }

  return tempEvent;
};

export const getEventUpdatedValues = (
  values: FormEventValues,
  prevProfileURL: string,
  prevCoverURL: string,
) => {
  const tempEvent: UpdateEvent = {
    title: values.title,
    startDate: values.startDate,
    endDate: values.endDate,
  };

  if (values.description) {
    tempEvent.description = values.description;
  }

  if (values.profileURL && prevProfileURL !== values.profileURL) {
    tempEvent.profile = {
      url: values.profileURL,
      size: 50,
      mimeType: 'image',
      extension: '.png',
    };
  }

  if (values.coverURL && values.coverURL !== prevCoverURL) {
    tempEvent.cover = {
      url: values.coverURL,
      size: 50,
      mimeType: 'image',
      extension: '.png',
    };
  }

  return tempEvent;
};
