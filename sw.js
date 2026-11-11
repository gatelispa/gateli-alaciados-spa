/* Gateli Alaciados y Spa — Service Worker v13 */
const CACHE = 'gateli-v14';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './img/logo.jpg',
  './img/portada-rosa.jpg',
  './img/antes-despues-2.jpg',
  './img/antes.jpg',
  './img/despues.jpg',
  './img/masajes.jpg',
  './img/conos.jpg',
  './img/cabello.jpg',
  './img/video-poster.jpg',
  './img/salon.jpg',
  './img/neon.jpg'
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
