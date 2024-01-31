import { createAction, createSlice } from '@reduxjs/toolkit';
import { getCustomerData } from 'Util/Customer';

import { CUSTOMER_SIGN_IN, UPDATE_CUSTOMER_FAVORITES } from './CustomerReducer.config';

const getInitialState = () => ({
  customer: {
    email: getCustomerData() ? getCustomerData().email : '',
    firstName: getCustomerData() ? getCustomerData().firstName : '',
    lastName: getCustomerData() ? getCustomerData().lastName : '',
    favorites: getCustomerData() ? getCustomerData().favorites : []
  }
});

export const customerSignIn = createAction(CUSTOMER_SIGN_IN);
export const updateCustomerFavorites = createAction(UPDATE_CUSTOMER_FAVORITES);

export const CustomerSlice = createSlice({
  name: 'CustomerReducer',
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(customerSignIn, (state, action) => {
      const {
        payload
      } = action;

      state.customer = payload;
    }
    ),
    builder.addCase(updateCustomerFavorites, (state, action) => {
      const {
        favorites
      } = getCustomerData() || { favorites: [] };

      state.customer.favorites = favorites;
    }
    );
  }
});

export default CustomerSlice.reducer;
