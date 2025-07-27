export interface ServiceWorkerConfig {
  enabled: boolean;
  cacheEnabled: boolean;
  cacheName: string;
  urlsToCache: string[];
  updateInterval: number;
  skipWaiting: boolean;
  clientsClaim: boolean;
}

const config: ServiceWorkerConfig = {
  enabled: process.env.NODE_ENV === 'production',
  cacheEnabled: process.env.NODE_ENV === 'production',
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

export default config; 