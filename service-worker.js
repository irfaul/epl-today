importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);
} else {
    console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
    { url: '/manifest.json', revision: '2' },
    { url: '/nav.html', revision: '2' },
    { url: '/index.html', revision: '2' },
    { url: '/preview.html', revision: '2' },
    { url: '/details.html', revision: '2' },
    { url: '/css/style.css', revision: '2' },
    { url: '/css/font.css', revision: '2' },
    { url: '/css/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '2' },
    { url: '/css/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o58a-wjw3UD0.woff2', revision: '2' },
    { url: '/css/materialize.min.css', revision: '2' },
    { url: '/js/materialize.min.js', revision: '2' },
    { url: '/js/nav.js', revision: '2' },
    { url: '/js/api.js', revision: '2' },
    { url: '/js/data.js', revision: '2' },
    { url: '/js/idb.js', revision: '2' },
    { url: '/js/db.js', revision: '2' },
    { url: '/main-js/index.js', revision: '2' },
    { url: '/main-js/details.js', revision: '2' },
    { url: '/main-js/preview.js', revision: '2' },
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    /\.(?:png|webp|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 2592000, // 30 hari
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'api-src'
    })
);

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