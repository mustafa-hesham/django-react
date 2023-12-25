/* eslint-disable no-magic-numbers */
/* eslint-disable new-cap */
importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js');
importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js');

workbox.core.clientsClaim();

workbox.routing.registerRoute(
    /(jpe?g|png|gif|svg)/,
    new workbox.strategies.StaleWhileRevalidate({
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
      const id = CryptoJS.MD5(body.query).toString();
      return cache.match(id).then((cachedResponse) => {
        const fetchedResponse = fetch(event.request).then(async (networkResponse) => {
          cache.put(id, networkResponse.clone());

          return networkResponse;
        });

        return cachedResponse || fetchedResponse;
      });
    }));
  } else {
    return;
  }
});
