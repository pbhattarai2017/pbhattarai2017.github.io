// sw.js
const CACHE_NAME = "cache-v1";
const BASE_URL = ".";
const ASSETS = [
  BASE_URL,
  BASE_URL + "/index.html",
  BASE_URL + "/data.js",
  BASE_URL + "/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return from cache if available
      if (response) return response;

      // Otherwise fetch from network
      return fetch(event.request).catch(() => {
        // Optional: fallback page / offline.html
        // return caches.match('/offline.html');
      });
    }),
  );
});

