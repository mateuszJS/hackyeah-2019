if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  const workbox = window.workbox;
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([
  {
    "url": "icon_192.png",
    "revision": "790d38da33df2076d463e098effbfec1"
  },
  {
    "url": "icon_512.png",
    "revision": "6c2d9e6e52bcfaee1cb3c2abe69fa886"
  },
  {
    "url": "icon.png",
    "revision": "9aa924800210af0351cfe68b5897f7cf"
  },
  {
    "url": "index.html",
    "revision": "ef185448500b2360a9a32d20ea9675e7"
  },
  {
    "url": "precache-manifest.7791b07cf13299458e3fe11b1ca1f536.js",
    "revision": "7791b07cf13299458e3fe11b1ca1f536"
  },
  {
    "url": "service-worker.js",
    "revision": "d977808bfb8c5fdf20f359ee90dc63e0"
  },
  {
    "url": "static/css/main.22eaab41.chunk.css",
    "revision": "ba6334ede023f8bcf75b925948de6223"
  },
  {
    "url": "static/js/2.f07dc288.chunk.js",
    "revision": "22ca0019be5015c52d20df15f69cdb40"
  },
  {
    "url": "static/js/main.54b55112.chunk.js",
    "revision": "5c9cd85bd7f723c7c26cb2e7b134500c"
  },
  {
    "url": "static/js/runtime~main.9b2a7a55.js",
    "revision": "bb309d6738360fc7fc5ab3cbb080d265"
  },
  {
    "url": "static/media/logo_lot.7b561315.png",
    "revision": "7b561315efc15b46f7730c981ea3a357"
  }
]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}