/* eslint-disable no-restricted-globals */

// Service worker for Ling's Tales. Built by react-scripts (Workbox
// InjectManifest): every hashed file in the build output is listed in
// self.__WB_MANIFEST. Once a visitor has loaded the site once, the app shell
// and the Ear Monkeys game keep working with no connection.

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";

const CDN_CACHE = "cdn-assets-v1";
const FONT_FILE_CACHE = "google-font-files-v1";
const IMAGE_CACHE = "site-images-v1";

// Third-party files index.html loads from CDNs. They are fetched again here at
// install time so they are cached even on the very first visit, before this
// worker controls the page.
const CDN_URLS = [
  "https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.3.1/lumen/bootstrap.min.css",
  "https://fonts.googleapis.com/css?family=Cinzel+Decorative|Lato&display=swap",
  "https://code.jquery.com/jquery-3.3.1.slim.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
];
const CDN_HOSTS = [
  "cdnjs.cloudflare.com",
  "code.jquery.com",
  "stackpath.bootstrapcdn.com",
  "fonts.googleapis.com",
];

clientsClaim();
cleanupOutdatedCaches();

// Precache the app shell: HTML, JS, CSS and small assets. Book page images
// (about 13 MB in total) are left out so a first visit stays light; they are
// cached on demand below as they are viewed.
const isImage = (entry) => /\.(?:png|jpe?g|gif|webp|svg)$/i.test(entry.url);
precacheAndRoute(self.__WB_MANIFEST.filter((entry) => !isImage(entry)));

// Serve index.html for in-app navigations (/, /books, /ear-monkeys, ...),
// so client-side routes open offline too.
const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(({ request, url }) => {
  if (request.mode !== "navigate") return false;
  if (url.pathname.startsWith("/_")) return false;
  if (url.pathname.match(fileExtensionRegexp)) return false;
  return true;
}, createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"));

// Same-origin images: hashed filenames never change, so cache-first.
registerRoute(
  ({ url, request }) =>
    url.origin === self.location.origin && request.destination === "image",
  new CacheFirst({
    cacheName: IMAGE_CACHE,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 200 }),
    ],
  })
);

// CDN stylesheets and scripts: serve from cache, refresh in the background.
registerRoute(
  ({ url }) => CDN_HOSTS.indexOf(url.hostname) !== -1,
  new StaleWhileRevalidate({
    cacheName: CDN_CACHE,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 30 }),
    ],
  })
);

// Google font files are immutable; keep them for a year.
registerRoute(
  ({ url }) => url.hostname === "fonts.gstatic.com",
  new CacheFirst({
    cacheName: FONT_FILE_CACHE,
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }),
    ],
  })
);

// Fetch a cross-origin file with CORS when the host allows it (needed for the
// scripts index.html loads with integrity checks), else as an opaque response.
async function fetchForCache(url) {
  try {
    const response = await fetch(url, { mode: "cors" });
    if (response.ok) return response;
  } catch (e) {
    // Fall through to a no-cors request.
  }
  return fetch(url, { mode: "no-cors" });
}

async function warmCache(cacheName, urls) {
  const cache = await caches.open(cacheName);
  await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetchForCache(url);
        if (response && (response.ok || response.type === "opaque")) {
          await cache.put(url, response);
        }
      } catch (e) {
        // Offline or blocked: skip this file. The route above caches it on
        // the next successful page load.
      }
    })
  );
}

// The font stylesheet points at the actual font files; cache those too so
// the site's fonts also work offline.
async function warmFontFiles() {
  try {
    const cache = await caches.open(CDN_CACHE);
    const cssResponse = await cache.match(CDN_URLS[1]);
    if (!cssResponse || cssResponse.type === "opaque") return;
    const css = await cssResponse.text();
    const urls = [];
    const pattern = /url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g;
    let match = pattern.exec(css);
    while (match) {
      if (urls.indexOf(match[1]) === -1) urls.push(match[1]);
      match = pattern.exec(css);
    }
    await warmCache(FONT_FILE_CACHE, urls);
  } catch (e) {
    // Fonts are cosmetic; never fail the install over them.
  }
}

// Warm the CDN caches at install, but never let a slow or blocked CDN hold
// up the install itself: after WARM_TIMEOUT_MS the install proceeds and any
// file still missing is cached by the runtime routes on the next page load.
const WARM_TIMEOUT_MS = 8000;

self.addEventListener("install", (event) => {
  const warm = warmCache(CDN_CACHE, CDN_URLS).then(warmFontFiles);
  const timeout = new Promise((resolve) => setTimeout(resolve, WARM_TIMEOUT_MS));
  event.waitUntil(Promise.race([warm, timeout]));
});

// Let the page ask a freshly installed worker to take over right away.
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
