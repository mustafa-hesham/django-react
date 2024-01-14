import Field from 'Util/Field';
import { fetchQuery } from 'Util/Request';

export function getAllProducts() {
  const query = new Field('products')
      .addFieldList(getAllProductsFieldList());

  return fetchQuery(query);
}

export function getAllProductsFieldList() {
  return [
    'id',
    'SKU',
    'name',
    'price',
    'isAvailable',
    'quantity',
    'weight',
    'description',
    getProductVariants()
  ];
}

function getProductVariants() {
  return new Field('variants')
      .addFieldList(getProductVariantsFieldList());
}

function getProductVariantsFieldList() {
  return [
    'id',
    'image',
    'quantity',
    getProductSize(),
    getProductColor(),
    getProductVariantOrder()
  ];
}

function getProductSize() {
  return new Field('size')
      .addField('name');
}

function getProductColor() {
  return new Field('color')
      .addFieldList(productColorFieldList());
}

function productColorFieldList() {
  return [
    'name',
    'hexValue'
  ];
}

function getProductVariantOrder() {
  return new Field('productvariant')
      .addField('order');
}

export function getProductsByCategoryName(categoryName) {
  const query = new Field('productsByCategory')
      .addArgument('category', categoryName, 'String!')
      .addFieldList(getAllProductsFieldList());

  return fetchQuery(query);
}
