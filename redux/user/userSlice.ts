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

    //   builder.addCase(getUsers.pending, (state) => {
    //     state.loading = true;
    //   });
    //   builder.addCase(getUsers.fulfilled, (state, action) => {
    //     state.user = action.payload;
    //     state.loading = false;
    //   });
    //   builder.addCase(getUsers.rejected, (state, action) => {
    //     state.loading = false;
    //     state.errors = action.payload;
    //   });
  },
});

export const { setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.user.value;

export default userSlice.reducer;
