import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser, OverviewPages, Page } from './types';
import {
  addConnectedWallet,
  removeConnectedWallet,
} from '../wallet/walletSlice';
import { FmPayloadMethod } from 'fortmatic';

export interface UserState {
  user: IUser | null;
  loading: boolean;
  errors: any;
  loggedIn: boolean;
  currentPage: Page | OverviewPages;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  errors: null,
  loggedIn: false,
  currentPage: Page.LandingPage,
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
    setCurrentPage: (state, action: PayloadAction<Page | OverviewPages>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addConnectedWallet, (state) => {
      state.loggedIn = true;
    });

    builder.addCase(removeConnectedWallet, (state) => {
      state.loggedIn = false;
      state.currentPage = Page.LandingPage;
    });
  },
});

export const { setUser, setCurrentPage } = userSlice.actions;

export default userSlice.reducer;
