import Field from 'Util/Field';
import { fetchMutation } from 'Util/Request';

export function getAuthToken(username, password) {
  const mutation = new Field('tokenAuth')
      .addArgument('username', username)
      .addArgument('password', password)
      .addFieldList(authTokenFields());

  return fetchMutation(mutation);
}

export function refreshAuthToken(refreshToken) {
  const mutation = new Field('refreshToken')
      .addArgument('refreshToken', refreshToken)
      .addFieldList(authTokenFields());

  return fetchMutation(mutation);
}

export function revokeAuthToken(refreshToken) {
  const mutation = new Field('revokeToken')
      .addArgument('refreshToken', refreshToken)
      .addField('revoked');

  return fetchMutation(mutation);
}

export function authTokenFields() {
  return [
    'token',
    'refreshToken',
    'refreshExpiresIn'
  ];
};
