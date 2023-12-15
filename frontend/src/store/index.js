import { configureStore } from '@reduxjs/toolkit';
import AccountOverlayReducer from 'Store/AccountOverlay/AccountOverlay.reducer';

export const getStore = () => configureStore({
  reducer: {
    AccountOverlayReducer,
  },
});
