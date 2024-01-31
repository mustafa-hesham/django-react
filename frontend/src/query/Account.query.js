import { getAllProductsFieldList } from 'Query/Product.query';
import Field from 'Util/Field';
import { fetchMutation, fetchQuery } from 'Util/Request';

export function createNewCustomer(email, firstName, lastName, password, password2, birthDate) {
  const mutation = new Field('createCustomer')
      .addArgument('email', email, 'String!')
      .addArgument('firstName', firstName, 'String!')
      .addArgument('lastName', lastName, 'String!')
      .addArgument('password', password, 'String!')
      .addArgument('password2', password2, 'String!')
      .addArgument('birthDate', birthDate, 'String')
      .addField(getNewCustomer());

  return fetchMutation(mutation);
};

function getNewCustomer() {
  return new Field('customer')
      .addField('email')
      .addField('firstName')
      .addField('lastName')
      .addField('birthDate');
}

export function getCustomerFavorites(customerEmail) {
  const query = new Field('getCustomerFavorites')
      .addArgument('customerEmail', customerEmail, 'String!')
      .addField(getProductFromFavorites());

  return fetchQuery(query);
}

function getProductFromFavorites() {
  return new Field('product')
      .addFieldList(getAllProductsFieldList());
}

export function addProductsToFavorites(SKUs, customerEmail) {
  const mutation = new Field('addProductsToFavorites')
      .addArgument('customerEmail', customerEmail, 'String!')
      .addArgument('SKUs', SKUs, '[String]!')
      .addField('isProductAdded');

  return fetchMutation(mutation);
};

export function removeProductsFromFavorites(SKUs, customerEmail) {
  const mutation = new Field('removeProductsFromFavorites')
      .addArgument('customerEmail', customerEmail, 'String!')
      .addArgument('SKUs', SKUs, '[String]!')
      .addField('isProductRemoved');

  return fetchMutation(mutation);
};
