import { configureStore } from '@reduxjs/toolkit';
import AccountOverlayReducer from 'Store/AccountOverlay/AccountOverlay.reducer';

export function getStore() {
  return configureStore({
    reducer: {
      AccountOverlayReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
}
