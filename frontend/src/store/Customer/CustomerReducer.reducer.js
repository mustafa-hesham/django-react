import { createAction, createSlice } from '@reduxjs/toolkit';

import { CUSTOMER_SIGN_IN } from './CustomerReducer.config';

const getInitialState = () => ({
  customer: {
    username: ''
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
        payload: {
          username
        }
      } = action;

      state.customer.username = username;
    }
    );
  }
});

export default CustomerSlice.reducer;
