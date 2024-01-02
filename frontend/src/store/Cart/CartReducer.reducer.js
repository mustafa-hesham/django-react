import { createAction, createSlice } from '@reduxjs/toolkit';
import {
  getCartId,
  getCartItems,
  getCartSubtotal,
  getCartTotal,
  getCartTotalNumberOfItems } from 'Util/Cart';

import { ADD_PRODUCT_TO_CART, TOGGLE_CART_OVERLAY } from './CartReducer.config';

const getInitialState = () => ({
  isCartOverlayToggled: false,
  cartId: getCartId(),
  cartItems: getCartItems() ?? [],
  subtotal: getCartSubtotal() ?? 0.00,
  total: getCartTotal() ?? 0.00,
  tax: 0.0,
  numberOfItems: getCartTotalNumberOfItems() ?? 0
});

export const updateToggleCartOverlay = createAction(TOGGLE_CART_OVERLAY);
export const addProductToCart = createAction(ADD_PRODUCT_TO_CART);

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
    builder.addCase(addProductToCart, (state, action) => {
      const {
        payload: {
          cartItems,
          total,
          numberOfItems
        }
      } = action;

      state.cartItems = cartItems;
      state.total = total;
      state.numberOfItems = numberOfItems;
    }
    );
  }
});

export default CartSlice.reducer;
