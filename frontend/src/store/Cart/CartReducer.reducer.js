import { createAction, createSlice } from '@reduxjs/toolkit';

import { TOGGLE_CART_OVERLAY } from './CartReducer.config';

const getInitialState = () => ({
  isCartOverlayToggled: false
});

export const updateToggleCartOverlay = createAction(TOGGLE_CART_OVERLAY);

export const CartSlice = createSlice({
  name: 'CartReducer',
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateToggleCartOverlay, (state, action) => {
      const {
        payload
      } = action;

      state.isCartOverlayToggled = payload;
    }
    );
  }
});

export default CartSlice.reducer;
