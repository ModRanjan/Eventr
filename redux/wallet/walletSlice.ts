import { createSlice } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';

import { IWallet, ConnectionType } from './types';

export interface WalletState {
  connectedWallets: IWallet[];
  connectionType: ConnectionType | null;
  loggedIn: boolean;
}

const initialState: WalletState = {
  connectedWallets: [],
  connectionType: null,
  loggedIn: false,
};

const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    addConnectedWallet(state, { payload }) {
      const existsAlready = state.connectedWallets.find((wallet) =>
        shallowEqual(payload.connectedWallet, wallet),
      );

      if (!existsAlready) {
        state.connectedWallets = state.connectedWallets.concat(
          payload.connectedWallet,
        );

        state.connectionType = payload.connectionType;
        state.loggedIn = payload.loggedIn;
      }
    },
    removeConnectedWallet(state, { payload }) {
      state.connectedWallets = state.connectedWallets.filter(
        (wallet) => !shallowEqual(wallet, payload.connectedWallet[0]),
      );

      state.connectionType = payload.connectionType;
      state.loggedIn = payload.loggedIn;
    },
  },
});

export const { addConnectedWallet, removeConnectedWallet } =
  walletsSlice.actions;
export default walletsSlice.reducer;
