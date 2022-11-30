import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUser } from './types';
import { IEvent } from '../event/types';
import {
  addConnectedWallet,
  removeConnectedWallet,
} from '../wallet/walletSlice';

export interface UserState {
  user: IUser | null;
  loading: boolean;
  errors: any;
  loggedIn: boolean;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  errors: null,
  loggedIn: false,
};

// actions : are processes thet get data from the backend

// reducers : reduse to a specific state => manupilate the existing state

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addConnectedWallet, (state, payload) => {
      state.loggedIn = true;
    });

    builder.addCase(removeConnectedWallet, (state, payload) => {
      state.loggedIn = false;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
