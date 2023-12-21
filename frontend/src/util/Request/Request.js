import { getCookie } from 'Util/Cookies';
import { getAuthTokens } from 'Util/Token';

import {
  CONTENT_TYPE,
  CSRF_TOKEN, GRAPHQL_URI,
  MUTATION_TYPE, QUERY_TYPE,
  REQUEST_METHOD_POST } from './Request.config';

export function getGraphqlURI() {
  const {
    location: { origin }
  } = window;

  return `${origin}${GRAPHQL_URI}`;
}

export const fetchQuery = (query) => {
  return fetchRequest(query, QUERY_TYPE);
};

export const fetchMutation = (mutation) => {
  return fetchRequest(mutation, MUTATION_TYPE);
};

export const fetchRequest = async (request, requestType) => {
  const {
    token
  } = getAuthTokens();

  const response = await fetch(getGraphqlURI(), {
    method: REQUEST_METHOD_POST,
    headers: {
      'Content-Type': CONTENT_TYPE,
      'Authorization': `JWT ${token}`,
      'X-CSRFToken': getCookie(CSRF_TOKEN)
    },
    body: JSON.stringify({
      query: composeRequest(request, requestType)
    })
  });

  const { data } = await response.json();

  return data;
};

export function composeRequest(request, requestType) {
  const {
    alias: operationAlias,
    name: operationName,
    args: operationArgs,
    fields: operationFields
  } = request;

  return `${requestType} {${formatRequest(
      operationAlias,
      operationName,
      operationArgs,
      extractFields(operationFields).join(' ')
  )}}`;
}

export function formatRequest(alias, name, args, formattedFields) {
  return `${formatAlias(alias)}${name} ${mapArgs(args)}{${formattedFields}}`;
}

export function extractFields(fields) {
  return fields.map((field) => {
    const {
      alias,
      name,
      args,
      fields
    } = field;

    return fields.length ?
    formatRequest(alias, name, args, mapFields(fields).join(' ')) :
    name;
  });
}

export function mapArgs(args) {
  const extractedArgs = args.map((arg) => {
    const {
      name,
      value
    } = arg;

    const formattedArgs = typeof value === 'string'? `"${value}"` : value;

    return `${name}: ${formattedArgs}`;
  });

  return extractedArgs.length ? `(${extractedArgs.join(', ')})` : '';
}

export function mapFields(fields) {
  return fields.map((field) => {
    const {
      name
    } = field;

    return name;
  });
}

export function formatAlias(alias) {
  return alias?? `${alias}:`;
}
