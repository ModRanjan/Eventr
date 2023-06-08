import { configureStore } from '@reduxjs/toolkit';

import user from './user/userSlice';
import wallets from './wallet/walletSlice';
import event from './event/eventSlice';
import pass from './pass/passSlice';
import passCategory from './passCategory/passCategorySlice';
import processes from './processes/procesesSlice';

const store = configureStore({
  reducer: { user, wallets, event, pass, passCategory, processes },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
