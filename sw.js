const CACHE_NAME = 'planer2ics-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Zwraca wersję z cache, jeśli istnieje. Jeśli nie, pobiera z sieci.
                return response || fetch(event.request);
            })
    );
});