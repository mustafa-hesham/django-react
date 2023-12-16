import {
  CONTENT_TYPE,
  GRAPHQL_URI,
  REQUEST_METHOD } from './Request.config';

export function getGraphqlURI() {
  const {
    location: { origin },
  } = window;

  return `${ origin }${GRAPHQL_URI}`;
}

export const getAllProducts = () => {
  const query =`{products {name SKU}}`;

  fetch(getGraphqlURI(), {
    method: REQUEST_METHOD,
    headers: { 'Content-Type': CONTENT_TYPE },
    body: JSON.stringify({
      query: query,
    }),
  })
      .then((res) => res.json())
      .then((res) => console.log(res.data));
};
