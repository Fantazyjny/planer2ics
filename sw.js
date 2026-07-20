const CACHE_NAME = 'planer2ics-v2';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json'
];

self.addEventListener('install', event => {
    self.skipWaiting();
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

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache); // Usuwa stary cache
                    }
                })
            );
        })
    );
    self.clients.claim(); // Przejmuje kontrolę nad wszystkimi kartami od razu
});