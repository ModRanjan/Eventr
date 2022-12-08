import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { file } from './types';
import { removeConnectedWallet } from '../wallet/walletSlice';

export interface IEvent {
  id: number | null;
  slug: number | null;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  Files: file[] | null;
}

export const initialState: IEvent = {
  id: null,
  slug: null,
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  Files: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setCurrentEvent: (state, action: PayloadAction<IEvent>) => {
      console.log('action.payload', action.payload);
      state.id = action.payload.id;
      state.slug = action.payload.slug;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.Files = action.payload.Files;
    },

    removeCurrentEvent: (state, action: PayloadAction<IEvent>) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeConnectedWallet, (state) => {});
  },
});

export const { setCurrentEvent, removeCurrentEvent } = eventSlice.actions;

export default eventSlice.reducer;
