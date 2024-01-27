import Field from 'Util/Field';
import { fetchMutation } from 'Util/Request';

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
