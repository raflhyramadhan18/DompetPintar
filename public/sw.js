const CACHE_NAME = 'app-cache-v3';
const urlsToCache = [
  '/',
  '/logo.png',
  '/manifest.webmanifest',
  '/favicon.ico'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Menggunakan map agar jika satu gagal, yang lain tetap jalan
      return Promise.allSettled(
        urlsToCache.map(url => cache.add(url))
      );
    })
  );
});
// Aktivasi Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Strategi Fetch (Network First, fallback to cache)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});