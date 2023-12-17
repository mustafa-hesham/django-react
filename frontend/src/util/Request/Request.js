import {
  CONTENT_TYPE,
  GRAPHQL_URI,
  MUTATION_TYPE, QUERY_TYPE,
  REQUEST_METHOD_POST } from './Request.config';

export function getGraphqlURI() {
  const {
    location: { origin },
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
  const response = await fetch(getGraphqlURI(), {
    method: REQUEST_METHOD_POST,
    headers: { 'Content-Type': CONTENT_TYPE },
    body: JSON.stringify({
      query: composeRequest(request, requestType),
    }),
  });

  const { data } = await response.json();

  return data;
};

export function composeRequest(request, requestType) {
  const {
    name: operationName,
    alias: operationAlias,
    fields: operationFields,
    args: operationArgs,
  } = request;

  const formattedFields = extractFields(operationFields).join(' ');
  const formattedAlias = formatAlias(operationAlias);
  const extractedArgs = mapArgs(operationArgs).join(', ');
  const formattedArgs = extractedArgs ? `(${extractedArgs})` : '';

  return `${requestType} {${formattedAlias}${operationName} ${formattedArgs}{${formattedFields}}}`;
}

export function extractFields(fields) {
  return fields.map((field) => {
    const {
      name,
      alias,
      fields,
      args,
    } = field;

    const extractedArgs = mapArgs(args).join(', ');
    const formattedArgs = extractedArgs ? `(${extractedArgs})` : '';

    return fields.length ?
    `${formatAlias(alias)}${name} ${formattedArgs}{${mapFields(fields).join(' ')}}` :
    name;
  });
}

export function mapArgs(args) {
  return args.map((arg) => {
    const {
      name,
      value,
    } = arg;

    return `${name}: ${value}`;
  });
}

export function mapFields(fields) {
  return fields.map((field) => {
    const {
      name,
    } = field;

    return name;
  });
}

export function formatAlias(alias) {
  return alias?? `${alias}:`;
}
