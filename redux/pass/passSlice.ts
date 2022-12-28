import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Pass } from './type';
import { setCurrent } from '../event/eventSlice';

export interface IPass {
  pass: Pass | null;
  eventId: number | null;
}

const initialState: IPass = {
  pass: null,
  eventId: null,
};

const passSlice = createSlice({
  name: 'pass',
  initialState,
  reducers: {
    setPass: (state, action: PayloadAction<IPass>) => {
      const Pass = action.payload.pass;
      if (Pass) {
        state.pass = Pass;
      }

      state.eventId = action.payload.eventId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCurrent, (state) => {
      state.pass = null;
    });
  },
});

export const { setPass } = passSlice.actions;

export default passSlice.reducer;
