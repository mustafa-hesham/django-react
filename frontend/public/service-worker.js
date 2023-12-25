/* eslint-disable no-magic-numbers */
/* eslint-disable new-cap */
// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js');
importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js');

workbox.core.clientsClaim();

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
workbox.routing.registerRoute(
    /(jpe?g|png|gif|svg)/, // Customize this strategy as needed, e.g., by changing to CacheFirst.
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'images',
      plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
        new workbox.expiration.ExpirationPlugin({ maxEntries: 50 })
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
  // Check if this is a request for an graphql query
  if (event.request.url.endsWith('graphql/')) {
    event.respondWith(caches.open('graphql').then(async (cache) => {
      // Go to the cache first
      const requestClone = event.request.clone();
      const body = await requestClone.json();
      const id = CryptoJS.MD5(body.query).toString();
      return cache.match(id).then((cachedResponse) => {
        const fetchedResponse = fetch(event.request).then(async (networkResponse) => {
          cache.put(id, networkResponse.clone());

          // Return the network response
          return networkResponse;
        });

        return cachedResponse || fetchedResponse;
      });
    }));
  } else {
    return;
  }
});
