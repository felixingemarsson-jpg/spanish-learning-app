const CACHE_NAME = 'lang-learn-v1';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/fsrs.js',
  './js/language.js',
  './js/tts.js',
  './js/srs-engine.js',
  './js/data-spanish.js',
  './js/data-russian.js',
  './js/data-readings-spanish.js',
  './js/data-readings-russian.js',
  './js/exercises/flashcards.js',
  './js/exercises/conjugation.js',
  './js/exercises/translation.js',
  './js/exercises/cloze.js',
  './js/exercises/grammar-quiz.js',
  './js/exercises/dictation.js',
  './js/exercises/reading.js',
  './js/exercises/word-order.js',
  './js/exercises/pronunciation.js',
  './js/exercises/smart-session.js',
  './js/progress.js',
  './js/github-sync.js',
  './js/app.js',
  './assets/favicon.svg',
  './manifest.json',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Network-first for API calls (TTS, GitHub), cache-first for app assets
  if (e.request.url.includes('api.elevenlabs.io') || e.request.url.includes('api.github.com')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(response => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
      return response;
    }))
  );
});
