import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Event, CurrentEvent, IDeployedEvent } from './types';
import { IPass, setPass } from '../pass/passSlice';
import { shallowEqual } from 'react-redux';

export interface IEvent {
  events: Event[];
  current: CurrentEvent | null;
  contractEvents: IDeployedEvent[] | undefined;
}

export const initialState: IEvent = {
  events: [],
  current: null,
  contractEvents: undefined,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<CurrentEvent>) => {
      state.current = action.payload;
    },
    setCurrentPublished: (state, action: PayloadAction<boolean>) => {
      if (state.current) state.current.published = action.payload;
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      const events = action.payload;

      events.map((tempEvent) => {
        const existsAlready = state.events.find((event) =>
          shallowEqual(tempEvent.id, event.id),
        );

        if (!existsAlready) {
          state.events = state.events.concat(tempEvent);
        }
      });
    },
    setContractEvents: (state, action: PayloadAction<IDeployedEvent[]>) => {
      state.contractEvents = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setPass, (state, action: PayloadAction<IPass>) => {
      const pass = action.payload.pass;

      if (state.current)
        if (pass) state.current.hasPass = true;
        else state.current.hasPass = false;
    });
  },
});

export const { setCurrent, setEvents, setCurrentPublished, setContractEvents } =
  eventSlice.actions;

export default eventSlice.reducer;
