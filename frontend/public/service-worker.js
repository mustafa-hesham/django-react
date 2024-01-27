/* eslint-disable no-magic-numbers */
/* eslint-disable new-cap */
importScripts('./sw-dependencies/workbox-sw.js');
importScripts('./sw-dependencies/md5.js');

workbox.core.clientsClaim();

workbox.routing.registerRoute(
    /(jpe?g|png|gif|svg)/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({ maxEntries: 50, maxAge: 3600 * 60 })
      ]
    })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.

self.addEventListener('fetch', async (event) => {
  if (event.request.url.endsWith('graphql/')) {
    event.respondWith(caches.open('graphql').then(async (cache) => {
      const requestClone = event.request.clone();
      const body = await requestClone.json();
      const id = CryptoJS.MD5(body.query + JSON.stringify(body.variables)).toString();
      return cache.match(id).then((cachedResponse) => {
        const fetchedResponse = fetch(event.request).then(async (networkResponse) => {
          const networkResponseClone = networkResponse.clone();
          const { errors } = await networkResponseClone.json();
          let isUnCached = false;
          unCachedQueries.forEach((query) => {
            if (body.query.includes(query)) {
              isUnCached = true;
            }
          });

          if (!errors && !isUnCached) {
            cache.put(id, networkResponse.clone());
          }

          return networkResponse;
        });

        return cachedResponse || fetchedResponse;
      });
    }));
  } else {
    return;
  }
});

const unCachedQueries = [
  'cartByUser',
  'tokenAuth',
  'createCartForCustomer',
  'createCustomer'
];
