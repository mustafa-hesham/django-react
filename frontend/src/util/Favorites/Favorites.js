import { addProductsToFavorites, removeProductsFromFavorites } from 'Query/Account.query';
import { updateCustomerFavorites } from 'Store/Customer/CustomerReducer.reducer';
import { getCustomerData, isSignedIn, setCustomerData } from 'Util/Customer';

import { GUEST_FAVORITES } from './Favorites.config';

export function setGuestFavorites(favorites) {
  localStorage.setItem(GUEST_FAVORITES, JSON.stringify(favorites));
}

export function getGuestFavorites() {
  const guestFavorites = localStorage.getItem(GUEST_FAVORITES);
  return guestFavorites ? JSON.parse(guestFavorites) : [];
}

export function removeGuestFavorites() {
  localStorage.removeItem(GUEST_FAVORITES);
}

export async function addOrRemoveProductFromFavorites(product, customerEmail, dispatch) {
  if (isSignedIn()) {
    if (!!getCustomerData().favorites.find((favorite) => favorite.id === product.id)) {
      setCustomerData({ ...getCustomerData(), favorites: getCustomerData().favorites.filter(
          (favorite) => favorite.id !== product.id
      ) });

      await removeProductsFromFavorites([product.SKU], customerEmail);
    } else {
      setCustomerData({ ...getCustomerData(), favorites: [...getCustomerData().favorites, product] });
      await addProductsToFavorites([product.SKU], customerEmail);
    }

    dispatch(updateCustomerFavorites());
    return;
  }

  if (getGuestFavorites().find((favorite) => favorite.id === product.id)) {
    removeProductFromGuestFavorites(product);
    return;
  }

  setGuestFavorites([...getGuestFavorites(), product]);
};

export function removeProductFromGuestFavorites(product) {
  setGuestFavorites(getGuestFavorites().filter((favorite) => favorite.id !== product.id));
};

export function isFavorite(product) {
  if (isSignedIn() && getCustomerData().favorites) {
    return !!getCustomerData().favorites.find(
        (favorite) => favorite.id === product.id
    );
  }

  return !!getGuestFavorites().find((favorite) => favorite.id === product.id);
};
