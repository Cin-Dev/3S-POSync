import config from '@/config/serviceWorker';

// Create a configuration object that will be injected into the service worker
const serviceWorkerConfig = {
  enabled: process.env.NODE_ENV === 'production' && config.enabled,
  cacheEnabled: process.env.NODE_ENV === 'production' && config.cacheEnabled,
  cacheName: config.cacheName,
  urlsToCache: config.urlsToCache,
  updateInterval: config.updateInterval,
  skipWaiting: config.skipWaiting,
  clientsClaim: config.clientsClaim
};

export async function registerServiceWorker() {
  // Double-check we're in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('Service worker registration skipped in development mode');
    return;
  }

  if (!serviceWorkerConfig.enabled) {
    console.log('Service worker is disabled by configuration');
    return;
  }

  if ('serviceWorker' in navigator) {
    try {
      // Unregister any existing service workers
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('Unregistered existing service worker');
      }

      // Register new service worker with configuration
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
        updateViaCache: 'none'
      });

      // Inject configuration into the service worker
      if (registration.active) {
        registration.active.postMessage({
          type: 'CONFIG',
          config: serviceWorkerConfig
        });
      }

      console.log('Service worker registered successfully:', registration);

      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, serviceWorkerConfig.updateInterval);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New service worker version available');
            }
          });
        }
      });

    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  } else {
    console.log('Service workers are not supported in this browser');
  }
}

export async function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      console.log('Service worker unregistered successfully');
    } catch (error) {
      console.error('Service worker unregistration failed:', error);
    }
  }
} 