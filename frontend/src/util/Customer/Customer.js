import { getStore } from 'Store';
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
}

export function isSignIn() {
  const customerUsername = getStore()?.getState()?.CustomerReducer?.customer?.username;
  return !!customerUsername;
}

export function signInProcedure() {
  if (!isSignIn()) {
    return;
  }
}
