import { addProductToCart as storeAddProductToCart } from 'Store/Cart/CartReducer.reducer';

import { CART } from './Cart.config';

export function setCart(cartItems = []) {
  let cart = {};

  const {
    cartId = ''
  } = getCart();

  if (!!cartId) {
    const total = cartItems?.reduce(
        (accumulator, item) => accumulator + item.quantity * parseFloat(item.price),
        0
    ).toFixed(2);

    const numberOfItems = cartItems?.reduce(
        (accumulator, item) => accumulator + item.quantity,
        0
    );

    cart = {
      cartId: cartId,
      cartItems: cartItems,
      total: total,
      numberOfItems: numberOfItems
    };
  } else {
    cart = {
      cartId: generateUniqueCartID(),
      cartItems: [],
      total: 0.00,
      numberOfItems: 0
    };
  }

  localStorage.setItem(CART, JSON.stringify(cart));
}

export function getCart() {
  return JSON.parse(localStorage.getItem(CART)) || {};
}

export function updateCartReducer(dispatch) {
  const cart = getCart();
  const updateCartReducer = {
    ...cart
  };

  dispatch(storeAddProductToCart(updateCartReducer));
}

export function addProductToCart(product, quantity, dispatch) {
  let newCartItems = [];

  const {
    cartItems
  } = getCart();

  if (cartItems.some((item) => item.id === product.id)) {
    newCartItems = cartItems.map(
        (item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
    );
  } else {
    const newCartItem = {
      ...product,
      quantity
    };

    newCartItems = [...cartItems, newCartItem];
  }
  console.log(newCartItems);
  setCart(newCartItems);
  updateCartReducer(dispatch);
}

export function generateUniqueCartID() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    // eslint-disable-next-line no-magic-numbers
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  ).replace(/-/g, '');
}
