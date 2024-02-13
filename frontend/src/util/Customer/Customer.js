import { addProductsToFavorites, getCustomerFavorites } from 'Query/Account.query';
import { createCartForCustomer, getCartItemsByCustomer } from 'Query/Cart.query';
import { getStore } from 'Store';
import { updateCart } from 'Store/Cart/CartReducer.reducer';
import { updateCustomerFavorites } from 'Store/Customer/CustomerReducer.reducer';
import { getCart, mergeCarts, removeCart, setCart } from 'Util/Cart';
import { removeCookie } from 'Util/Cookies';
import { getGuestFavorites, removeGuestFavorites } from 'Util/Favorites';
import { CSRF_TOKEN } from 'Util/Request';
import { showNotificationMessage } from 'Util/ShowNotification';
import { removeAuthTokens } from 'Util/Token';

import { CUSTOMER } from './Customer.config';

export function setCustomerData(customer) {
  localStorage.setItem(CUSTOMER, JSON.stringify(customer));
};

export function getCustomerData() {
  const customer = localStorage.getItem(CUSTOMER);

  return customer ? JSON.parse(customer) : null;
};

export function removeCustomerData() {
  localStorage.removeItem(CUSTOMER);
};

export function logOut(errorMessage = null) {
  if (errorMessage) {
    showNotificationMessage('error', errorMessage);
  }

  removeAuthTokens();
  removeCustomerData();
  removeCookie(CSRF_TOKEN);
  removeCart();
  location.reload();
};

export function getUsernameFromState() {
  const customerUsername = getStore()?.getState()?.CustomerReducer?.customer?.email;
  return customerUsername || null;
};

export function isSignedIn() {
  return !!getCustomerData();
};

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
    getCustomerFavoritesQuery(customerUsername, dispatch);
  }
};

export function navigateTo(navigate, tabName) {
  if (typeof tabName !== 'string' || !tabName.length || typeof navigate !== 'function') {
    return;
  }
  const modifiedTabName = tabName.replace(' ', '_').toLowerCase();

  return navigate(`/my_account/${modifiedTabName}`);
};

async function getCustomerFavoritesQuery(customerEmail, dispatch) {
  const {
    getCustomerFavorites: favorites
  } = await getCustomerFavorites(customerEmail);

  const guestFavorites = getGuestFavorites();
  const productsFromFavorites = favorites.map((favorite) => favorite.product);

  const uniqueGuestFavorites = guestFavorites.reduce((accumulator, guestFavorite) => {
    if (!productsFromFavorites.find((customerFavorite) => customerFavorite.id === guestFavorite.id)) {
      accumulator.push(guestFavorite);
    }

    return accumulator;
  }, []);

  const combinedFavorites = [...productsFromFavorites, ...uniqueGuestFavorites];

  setCustomerData({ ...getCustomerData(), favorites: combinedFavorites });
  dispatch(updateCustomerFavorites());

  if (uniqueGuestFavorites.length) {
    const uniqueGuestFavoritesSKUs = uniqueGuestFavorites.map((favorites) => favorites.SKU);
    await addProductsToFavorites(uniqueGuestFavoritesSKUs, customerEmail);
  }

  removeGuestFavorites();
};
