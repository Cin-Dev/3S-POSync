/**
 * Service Worker Template
 * 
 * This is a template file that will be processed during build.
 * The CONFIG object below will be replaced with the actual configuration
 * from src/config/serviceWorker.ts during the build process.
 * 
 * The service worker provides:
 * 1. Offline caching of static assets
 * 2. Push notification handling
 * 3. Background sync capabilities
 * 4. Cache management
 */

// Template configuration - will be replaced during build
let CONFIG = {
  enabled: true,
  cacheEnabled: true,
  cacheName: 'vue-template-v1',
  urlsToCache: [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/favicon.ico',
    '/icons/favicon.svg',
    '/icons/apple-touch-icon.png',
    '/icons/favicon-96x96.png',
    '/icons/web-app-manifest-192x192.png',
    '/icons/web-app-manifest-512x512.png'
  ],
  updateInterval: 60 * 60 * 1000, // 1 hour
  skipWaiting: true,
  clientsClaim: true
};

// Listen for configuration messages
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CONFIG') {
    CONFIG = event.data.config;
    console.log('Service worker configuration updated:', CONFIG);
  }
});

// Install event - runs when the service worker is first installed
// or when a new version is downloaded
self.addEventListener('install', (event) => {
  // Skip waiting to activate the new service worker immediately
  if (CONFIG.skipWaiting) {
    self.skipWaiting();
  }
  
  // Skip caching if disabled
  if (!CONFIG.cacheEnabled) {
    return;
  }

  // Cache the static assets
  event.waitUntil(
    caches.open(CONFIG.cacheName)
      .then((cache) => {
        console.log('Opened cache');
        // Cache each URL individually to handle failures gracefully
        return Promise.allSettled(
          CONFIG.urlsToCache.map(url => 
            cache.add(url).catch(error => {
              console.warn(`Failed to cache ${url}:`, error);
            })
          )
        );
      })
  );
});

// Activate event - runs when the service worker is activated
// and takes control of the page
self.addEventListener('activate', (event) => {
  // Skip if caching is disabled
  if (!CONFIG.cacheEnabled) {
    return;
  }

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CONFIG.cacheName) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients if enabled
      CONFIG.clientsClaim ? clients.claim() : Promise.resolve()
    ])
  );
});

// Fetch event - intercepts network requests
// and serves from cache if available
self.addEventListener('fetch', (event) => {
  // Skip if caching is disabled
  if (!CONFIG.cacheEnabled) {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip API requests
  if (event.request.url.includes('/api/')) {
    return;
  }

  // Try to serve from cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        // Try network request
        return fetch(fetchRequest).then(
          (response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the response for future use
            caches.open(CONFIG.cacheName)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch(error => {
                console.warn('Failed to cache response:', error);
              });

            return response;
          }
        ).catch(() => {
          // If both cache and network fail:
          // - For navigation requests, show index.html
          // - For other requests, show offline message
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('Offline content not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icons/web-app-manifest-192x192.png',
    badge: '/icons/favicon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/icons/favicon-96x96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/favicon-96x96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
}); 