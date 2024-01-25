import { createAction, createSlice } from '@reduxjs/toolkit';
import { getCustomerData } from 'Util/Customer';

import { CUSTOMER_SIGN_IN } from './CustomerReducer.config';

const getInitialState = () => ({
  customer: {
    email: getCustomerData() ? getCustomerData().email : '',
    firstName: getCustomerData() ? getCustomerData().firstName : '',
    lastName: getCustomerData() ? getCustomerData().lastName : ''
  }
});

export const customerSignIn = createAction(CUSTOMER_SIGN_IN);

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
    );
  }
});

export default CustomerSlice.reducer;
