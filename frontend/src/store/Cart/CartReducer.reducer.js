import { createAction, createSlice } from '@reduxjs/toolkit';
import { createCartForCustomer } from 'Query/Cart.query';
import { getCart } from 'Util/Cart';
import { getCustomerData } from 'Util/Customer';

import {
  ADD_PRODUCT_TO_CART,
  CREATE_NEW_CART,
  TOGGLE_CART_OVERLAY,
  UPDATE_CART
} from './CartReducer.config';

const getInitialState = () => {
  if (getCart()) {
    return {
      isCartOverlayToggled: false,
      ...getCart()
    };
  } else {
    return {
      isCartOverlayToggled: false
    };
  }
};

export const updateToggleCartOverlay = createAction(TOGGLE_CART_OVERLAY);
export const addProductToCart = createAction(ADD_PRODUCT_TO_CART);
export const createNewCart = createAction(CREATE_NEW_CART);
export const updateCart = createAction(UPDATE_CART);

export const CartSlice = createSlice({
  name: 'CartReducer',
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateToggleCartOverlay, (state, action) => {
      const username = getCustomerData() ? getCustomerData().username : '';

      const {
        payload
      } = action;

      const {
        cartId,
        cartItems
      } = getCart();

      if (!!username && !payload) {
        createCartForCustomer(username, cartId, cartItems);
      }

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
    builder.addCase(updateCart, (state) => {
      const {
        total,
        numberOfItems,
        cartItems,
        cartId
      } = getCart();

      state.cartId = cartId;
      state.cartItems = cartItems;
      state.numberOfItems = numberOfItems;
      state.total = total;
    }
    );
  }
});

export default CartSlice.reducer;
