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
