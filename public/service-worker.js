const CACHE_NAME = 'charcoals-v1';
const RUNTIME_CACHE = 'runtime-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([
      '/',
    ])).then(self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => (key !== CACHE_NAME && key !== RUNTIME_CACHE) ? caches.delete(key) : null)
    )).then(self.clients.claim())
  );
});

// Runtime caching for images (stale-while-revalidate)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET
  if (request.method !== 'GET') return;

  // Skip cross-origin video to avoid large caching
  if (request.destination === 'video') return;

  // Cache images and same-origin assets
  if (request.destination === 'image' || url.origin === self.location.origin) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const networkFetch = fetch(request).then((resp) => {
          if (resp && resp.status === 200 && request.url.startsWith(self.location.origin)) {
            cache.put(request, resp.clone());
          }
          return resp;
        }).catch(() => cached);
        return cached || networkFetch;
      })
    );
  }
});
