import { addProductToCart as storeAddProductToCart } from 'Store/Cart/CartReducer.reducer';

import { CART_ID, CART_ITEMS, NUMBER_OF_ITEMS, SUBTOTAL, TOTAL } from './Cart.config';

export function setCartItems(cartItems) {
  setCartTotal(cartItems);
  setCartTotalNumberOfItems(cartItems);
  localStorage.setItem(CART_ITEMS, JSON.stringify(cartItems));
}

export function updateCartReducer(dispatch) {
  const updateCartReducer = {
    cartItems: getCartItems(),
    total: getCartTotal(),
    numberOfItems: getCartTotalNumberOfItems()
  };

  dispatch(storeAddProductToCart(updateCartReducer));
}

export function getCartItems() {
  return JSON.parse(localStorage.getItem(CART_ITEMS)) || [];
}

export function setCartSubtotal(subtotal) {
  localStorage.setItem(SUBTOTAL, JSON.stringify(subtotal));
}

export function getCartSubtotal() {
  return parseFloat(JSON.parse(localStorage.getItem(SUBTOTAL))) || 0.00;
}

export function setCartTotal(newCartItems) {
  const total = newCartItems.reduce(
      (accumulator, item) => accumulator + item.quantity * parseFloat(item.price),
      0
  ).toFixed(2);

  localStorage.setItem(TOTAL, JSON.stringify(total));
}

export function getCartTotal() {
  return parseFloat(JSON.parse(localStorage.getItem(TOTAL))) || 0.00;
}

export function getCartTotalNumberOfItems() {
  return parseInt(JSON.parse(localStorage.getItem(NUMBER_OF_ITEMS)));
}

export function setCartTotalNumberOfItems(cartItems) {
  const numberOfItems = cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
  );

  localStorage.setItem(NUMBER_OF_ITEMS, JSON.stringify(numberOfItems));
}

export function setCartId() {
  if (!getCartId()) {
    localStorage.setItem(CART_ID, JSON.stringify(generateUniqueCartID()));
  }
}

export function getCartId() {
  return JSON.parse(localStorage.getItem(CART_ID));
}

export function addProductToCart(product, quantity, dispatch) {
  let newCartItems = [];

  if (getCartItems().some((item) => item.id === product.id)) {
    newCartItems = getCartItems().map(
        (item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
    );
  } else {
    const newCartItem = {
      ...product,
      quantity
    };

    newCartItems = [...getCartItems(), newCartItem];
  }

  setCartItems(newCartItems);
  updateCartReducer(dispatch);
}

export function generateUniqueCartID() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    // eslint-disable-next-line no-magic-numbers
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  ).replace(/-/g, '');
}
