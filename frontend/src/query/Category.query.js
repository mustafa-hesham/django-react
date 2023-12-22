import Field from 'Util/Field';
import { fetchQuery } from 'Util/Request';

export function getAllCategories() {
  const query = new Field('categories')
      .addField('name');

  return fetchQuery(query);
}
