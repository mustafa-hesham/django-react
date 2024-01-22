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
    productCategoryFields(),
    getProductVariants()
  ];
}

function productCategoryFields() {
  return new Field('category')
      .addField('name');
}

function getProductVariants() {
  return new Field('variants')
      .addFieldList(getProductVariantsFieldList());
}

function getProductVariantsFieldList() {
  return [
    'id',
    getVariantImages(),
    'quantity',
    getProductSizes(),
    getProductColor(),
    getProductVariantOrder()
  ];
}

function getProductSizes() {
  return new Field('productsizecollectionSet')
      .addField(getProductSize())
      .addField('quantity');
}

export function getProductSize() {
  return new Field('size')
      .addField('name');
}

function getVariantImages() {
  return new Field('images')
      .addField('image');
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
  return new Field('productvariantcollection')
      .addField('order');
}

export function getProductsByCategoryName(categoryName) {
  const query = new Field('productsByCategory')
      .addArgument('category', categoryName, 'String!')
      .addFieldList(getAllProductsFieldList());

  return fetchQuery(query);
}

export function getProductBySKU(sku) {
  const query = new Field('productBySku')
      .addArgument('sku', sku, 'String!')
      .addFieldList(getAllProductsFieldList());

  return fetchQuery(query);
}
