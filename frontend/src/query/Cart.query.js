import { getAllProductsFieldList } from 'Query/Product.query';
import Field from 'Util/Field';
import { fetchMutation, fetchQuery } from 'Util/Request';

export function getCartItemsByCustomer(customer) {
  const query = new Field('cartByUser')
      .addArgument('user', customer)
      .addField('cartId')
      .addField('total')
      .addFieldList([getCartItemFieldList()]);

  return fetchQuery(query);
}

function getCartItemFieldList() {
  return new Field('cartitemSet')
      .addField('quantity')
      .addFieldList([getProductCartItemFieldList()]);
}

function getProductCartItemFieldList() {
  return new Field('product')
      .addFieldList(getAllProductsFieldList());
}

export function createCartForCustomer(username, cartId, cartItems) {
  const mutation = new Field('createCartForCustomer')
      .addArgument('username', username, 'String!')
      .addArgument('cartId', cartId, 'String!')
      .addArgument('cartItems', cartItems, '[CartItemInput]')
      .addFieldList([getCartList()]);

  return fetchMutation(mutation);
}

function getCartList() {
  return new Field('customerCart')
      .addField('cartId')
      .addField('total')
      .addFieldList([getCartItemFieldList()]);
}
