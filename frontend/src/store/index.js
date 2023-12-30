import { configureStore } from '@reduxjs/toolkit';
import AccountOverlayReducer from 'Store/AccountOverlay/AccountOverlayReducer.reducer';
import CartReducer from 'Store/Cart/CartReducer.reducer';
import CategoryReducer from 'Store/Category/CategoryReducer.reducer';
import CustomerReducer from 'Store/Customer/CustomerReducer.reducer';

export function getStore() {
  return configureStore({
    reducer: {
      AccountOverlayReducer,
      CustomerReducer,
      CategoryReducer,
      CartReducer
    }
  });
}
