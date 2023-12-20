import Field from 'Util/Field';
import { fetchQuery } from 'Util/Request';

export function getAllProducts() {
  const query = new Field('products')
      .addFieldList(getAllProductsFieldList());

  return fetchQuery(query);
}

export function getAllProductsFieldList() {
  return [
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
