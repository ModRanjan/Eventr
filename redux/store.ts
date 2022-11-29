import { configureStore } from '@reduxjs/toolkit';

import user from './user/userSlice';
import wallets from './wallet/walletSlice';

const store = configureStore({
  reducer: { user, wallets },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
