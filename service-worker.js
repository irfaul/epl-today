const CACHE_NAME = "epl-today-v1.9";
let urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/preview.html",
  "/details.html",
  "/pages/home.html",
  "/pages/standings.html",
  "/pages/scorer.html",
  "/pages/teams.html",
  "/pages/saved.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/cache-api.js",
  "/js/idb.js",
  "/js/db.js",
  "/main-js/index.js",
  "/main-js/details.js",
  "/main-js/preview.js",
  "/image/logo.png",
  "/image/header-badge.jpg",
  "/image/home-banner-1.jpg",
  "/image/home-banner-2.jpg",
  "/image/home-banner-3.jpg",
  "/image/icon-192x192.png",
  "/image/icon-512x512.png",
  "/image/favicon.png",
  "https://fonts.googleapis.com/css2?family=Quicksand&display=swap",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
];
 
self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
          return cache.addAll((urlsToCache))
              .then(() => self.skipWaiting());
      })
  );
});

self.addEventListener("fetch", function(event) {
  const base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, {ignoreSearch : true}).then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});

self.addEventListener('push', function(event) {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    const options = {
      body: body,
      icon: 'image/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
});