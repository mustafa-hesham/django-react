import { addProductToCart as storeAddProductToCart } from 'Store/Cart/CartReducer.reducer';

import { CART } from './Cart.config';

export function setCart(cartItems = [], customerCartId = '') {
  let cart = {};

  const {
    cartId = ''
  } = getCart();

  if (!!cartId) {
    const total = cartItems?.reduce(
        (accumulator, item) => accumulator + item.cartQuantity * parseFloat(item.price),
        0
    ).toFixed(2);

    const numberOfItems = cartItems?.reduce(
        (accumulator, item) => accumulator + item.cartQuantity,
        0
    );

    cart = {
      cartId: !!customerCartId ? customerCartId : cartId,
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

export function removeCart() {
  localStorage.removeItem(CART);
}

export function updateCartReducer(dispatch) {
  const cart = getCart();
  const updateCartReducer = {
    ...cart
  };

  dispatch(storeAddProductToCart(updateCartReducer));
}

export function addProductToCart(product, cartQuantity, dispatch) {
  let newCartItems = [];

  const {
    cartItems
  } = getCart();

  if (cartItems.some((item) => item.id === product.id)) {
    newCartItems = cartItems.map(
        (item) => item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + cartQuantity } : item
    );
  } else {
    const newCartItem = {
      ...product,
      cartQuantity
    };

    newCartItems = [...cartItems, newCartItem];
  }

  setCart(newCartItems);
  updateCartReducer(dispatch);
}

export function generateUniqueCartID() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    // eslint-disable-next-line no-magic-numbers
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  ).replace(/-/g, '');
}

export function removeProductFromCart(productID, dispatch) {
  const {
    cartItems = []
  } = getCart();

  if (!cartItems || !cartItems.some((item) => item.id === productID)) {
    return;
  }

  const newCartItems = cartItems.filter((item) => item.id !== productID);
  setCart(newCartItems);
  updateCartReducer(dispatch);
}

export function mergeCarts(customerCartItems = []) {
  const {
    cartItems: guestCartItems
  } = getCart();

  if (Array.isArray(guestCartItems) && !guestCartItems.length) {
    return customerCartItems;
  }

  const uniqueGuestItems = guestCartItems.reduce(
      (accumulator, item) => {
        if (!customerCartItems.find((customerItem) => customerItem.id === item.id)) {
          accumulator.push(item);
        }
        return accumulator;
      }
      , []);

  const newCartItems = customerCartItems.map((item) => {
    const repeatedItem = guestCartItems.find(
        (guestItem) => guestItem.id === item.id
    );

    if (repeatedItem) {
      return {
        ...item,
        cartQuantity: repeatedItem.cartQuantity + item.cartQuantity
      };
    } else {
      return item;
    }
  });

  return [...newCartItems, ...uniqueGuestItems];
}
