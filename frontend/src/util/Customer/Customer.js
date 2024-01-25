import { createCartForCustomer, getCartItemsByCustomer } from 'Query/Cart.query';
import { getStore } from 'Store';
import { updateCart } from 'Store/Cart/CartReducer.reducer';
import { getCart, mergeCarts, removeCart, setCart } from 'Util/Cart';
import { removeCookie } from 'Util/Cookies';
import { CSRF_TOKEN } from 'Util/Request';
import { removeAuthTokens } from 'Util/Token';

import { CUSTOMER } from './Customer.config';

export function setCustomerData(customer) {
  localStorage.setItem(CUSTOMER, JSON.stringify(customer));
}

export function getCustomerData() {
  const customer = localStorage.getItem(CUSTOMER);

  return customer ? JSON.parse(customer) : null;
}

export function removeCustomerData() {
  localStorage.removeItem(CUSTOMER);
}

export function logOut() {
  removeAuthTokens();
  removeCustomerData();
  removeCookie(CSRF_TOKEN);
  removeCart();
}

export function getUsernameFromState() {
  const customerUsername = getStore()?.getState()?.CustomerReducer?.customer?.email;
  return customerUsername || null;
}

export function isSignIn() {
  return !!getUsernameFromState();
}

export async function signInProcedure(dispatch) {
  const customerUsername = getCustomerData().email || getUsernameFromState();

  const {
    cartId: localCartId,
    cartItems = []
  } = getCart();

  const {
    cartByUser
  } = await getCartItemsByCustomer(customerUsername) || {};

  if (!cartByUser) {
    await createCartForCustomer(customerUsername, localCartId, cartItems);
  } else {
    const {
      cartId = '',
      cartitemSet
    } = cartByUser;

    const customerCartItems = cartitemSet.length? cartitemSet.map((item) => {
      const {
        productVariantId,
        productSize
      } = item;

      const selectedVariant = item.product.variants.find((variant) => parseInt(variant.id) === productVariantId);
      const selectedSize = selectedVariant.productsizecollectionSet.find(
          (sizeCollection) => sizeCollection.size.name === productSize.name
      );
      const selectedSizeVariant = {
        ...selectedVariant,
        productsizecollectionSet: {
          ...selectedSize
        }
      };

      const itemProduct = {
        ...item.product,
        variants: selectedSizeVariant
      };

      return {
        ...itemProduct,
        cartQuantity: item.quantity
      };
    }) : [];

    const newCartItems = cartItems.length ? mergeCarts(customerCartItems) : customerCartItems;

    if (cartItems.length) {
      await createCartForCustomer(customerUsername, cartId, newCartItems);
    }

    setCart(newCartItems, cartId);
    dispatch(updateCart());
  }
}
