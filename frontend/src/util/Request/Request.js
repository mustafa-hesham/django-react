import { getCookie } from 'Util/Cookies';
import { capitalize } from 'Util/General';
import {
  AUTH, CONTENT_TYPE,
  CSRF_TOKEN, GRAPHQL_URI,
  MUTATION_TYPE, QUERY_TYPE,
  REQUEST_METHOD_POST } from 'Util/Request';
import { getAuthTokens } from 'Util/Token';

export function getGraphqlURI() {
  const {
    location: { origin }
  } = window;

  // Replace port number during development.
  return `${origin.replace('3', '8')}${GRAPHQL_URI}`;
};

export const fetchQuery = (query) => {
  return fetchRequest(query, QUERY_TYPE);
};

export const fetchMutation = (mutation) => {
  return fetchRequest(mutation, MUTATION_TYPE);
};

const fetchRequest = async (request, requestType) => {
  const {
    token
  } = getAuthTokens();

  let requestHeaders = {
    'Content-Type': CONTENT_TYPE,
    'X-CSRFToken': getCookie(CSRF_TOKEN)
  };

  if (token) {
    requestHeaders = {
      ...requestHeaders,
      'Authorization': `JWT ${token}`
    };
  }

  const response = await fetch(getGraphqlURI(), {
    method: REQUEST_METHOD_POST,
    headers: requestHeaders,
    body: JSON.stringify(
        composeRequest(request, requestType)
    )
  });

  const { data, errors } = await response.json();
  const { logOut, isSignedIn } = require('Util/Customer');

  if (isSignedIn() && errors && AUTH.includes(errors[0].message)) {
    logOut(errors[0].message);
  }

  return errors? errors[0] : data;
};

function composeRequest(request, requestType) {
  const {
    alias: operationAlias,
    name: operationName,
    args: operationArgs,
    fields: operationFields
  } = request;

  return {
    query: `${requestType} ${capitalize(operationName)} ${mapArgsTypes(operationArgs)} {${formatRequest(
        operationAlias,
        operationName,
        operationArgs,
        extractFields(operationFields).join(' ')
    )}}`,
    variables: mapArgsValues(operationArgs)
  };
};

function formatRequest(alias, name, args, formattedFields) {
  return `${formatAlias(alias)}${name} ${mapArgs(args)}{${formattedFields}}`;
};

function extractFields(fields) {
  return fields.map((field) => {
    const {
      alias,
      name,
      args,
      fields
    } = field;

    return fields.length ?
    formatRequest(alias, name, args, extractFields(fields).join(' ')) :
    name;
  });
};

function mapArgs(args) {
  const extractedArgs = args.map((arg) => {
    const {
      name
    } = arg;

    return `${name}: $${name}`;
  });

  return extractedArgs.length ? `(${extractedArgs.join(', ')})` : '';
};

function mapArgsTypes(args) {
  const extractedArgsTypes= args.map((arg) => {
    const {
      name,
      type
    } = arg;

    return `$${name}: ${type}`;
  });

  return extractedArgsTypes.length ? `(${extractedArgsTypes.join(', ')})` : '';
};

function mapArgsValues(args) {
  const values = {};

  args.map((args) => {
    const {
      name,
      value
    } = args;

    values[name] = value;
  });

  return values;
};

function formatAlias(alias) {
  return alias?? `${alias}:`;
};
