import Field from 'Util/Field';
import { fetchMutation } from 'Util/Request';

export function getAuthToken(email, password) {
  const mutation = new Field('tokenAuth')
      .addArgument('email', email, 'String!')
      .addArgument('password', password, 'String!')
      .addFieldList(authTokenFields())
      .addFieldList([getUserData()]);

  return fetchMutation(mutation);
}

function getUserData() {
  return new Field('user')
      .addField('firstName')
      .addField('lastName');
}

export function refreshAuthToken(refreshToken) {
  const mutation = new Field('refreshToken')
      .addArgument('refreshToken', refreshToken, 'String!')
      .addFieldList(authTokenFields());

  return fetchMutation(mutation);
}

export function revokeAuthToken(refreshToken) {
  const mutation = new Field('revokeToken')
      .addArgument('refreshToken', refreshToken, 'String!')
      .addField('revoked');

  return fetchMutation(mutation);
}

export function authTokenFields() {
  return [
    'token',
    'refreshToken',
    'payload',
    'refreshExpiresIn'
  ];
};
