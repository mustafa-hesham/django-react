import { getAllProductsFieldList } from 'Query/Product.query';
import Field from 'Util/Field';
import { fetchMutation, fetchQuery } from 'Util/Request';

export function getCartItemsByCustomer(customer) {
  const query = new Field('cartByUser')
      .addArgument('user', customer, 'String')
      .addField('cartId')
      .addField('total')
      .addFieldList([getCartItemFieldList()]);

  return fetchQuery(query);
}

function getCartItemFieldList() {
  return new Field('cartitemSet')
      .addField('quantity')
      .addField('productVariantId')
      .addFieldList([getCartItemSize()])
      .addFieldList([getProductCartItemFieldList()]);
}

function getCartItemSize() {
  return new Field('productSize')
      .addField('name');
}

function getProductCartItemFieldList() {
  return new Field('product')
      .addFieldList(getAllProductsFieldList());
}

export function createCartForCustomer(user, cartId, cartItems) {
  const mutation = new Field('createCartForCustomer')
      .addArgument('user', user, 'String!')
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
