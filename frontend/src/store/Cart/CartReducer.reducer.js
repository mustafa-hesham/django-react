import { createAction, createSlice } from '@reduxjs/toolkit';
import { getCart } from 'Util/Cart';

import { ADD_PRODUCT_TO_CART, CREATE_NEW_CART, TOGGLE_CART_OVERLAY } from './CartReducer.config';

const getInitialState = () => {
  if (getCart()) {
    return {
      isCartOverlayToggled: false,
      ...getCart()
    };
  }
};

export const updateToggleCartOverlay = createAction(TOGGLE_CART_OVERLAY);
export const addProductToCart = createAction(ADD_PRODUCT_TO_CART);
export const createNewCart = createAction(CREATE_NEW_CART);

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
    builder.addCase(createNewCart, (state, action) => {
      const {
        payload
      } = action;

      state.cartId = payload;
    }
    );
  }
});

export default CartSlice.reducer;
