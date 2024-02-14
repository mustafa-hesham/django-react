import { createAction, createSlice } from '@reduxjs/toolkit';

import { UPDATE_CUSTOMER_FAVORITES, UPDATE_CUSTOMER_STATE } from './CustomerReducer.config';

function getCustomerData() {
  const customer = localStorage.getItem('customer');

  return customer ? JSON.parse(customer) : null;
};

const getInitialState = () => ({
  customer: {
    email: getCustomerData() ? getCustomerData().email : '',
    firstName: getCustomerData() ? getCustomerData().firstName : '',
    lastName: getCustomerData() ? getCustomerData().lastName : '',
    favorites: getCustomerData() ? getCustomerData().favorites : [],
    id: getCustomerData() ? getCustomerData().id : '',
    birthDate: getCustomerData() ? getCustomerData().birthDate : '1971-01-01'
  }
});

export const updateCustomerState = createAction(UPDATE_CUSTOMER_STATE);
export const updateCustomerFavorites = createAction(UPDATE_CUSTOMER_FAVORITES);

export const CustomerSlice = createSlice({
  name: 'CustomerReducer',
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateCustomerState, (state, action) => {
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
