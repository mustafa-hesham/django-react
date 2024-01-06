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
    'images',
    'weight',
    'description'
  ];
}

export function getProductsByCategoryName(categoryName) {
  const query = new Field('productsByCategory')
      .addArgument('category', categoryName, 'String!')
      .addFieldList(getAllProductsFieldList());

  return fetchQuery(query);
}
