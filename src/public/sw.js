const CACHE_VERSION = '2.0.0';
const CACHE_NAME = `farmsight-v${CACHE_VERSION}`;
const OFFLINE_CACHE = `farmsight-offline-v${CACHE_VERSION}`;
const DYNAMIC_CACHE = `farmsight-dynamic-v${CACHE_VERSION}`;
const IMAGE_CACHE = `farmsight-images-v${CACHE_VERSION}`;
const API_CACHE = `farmsight-api-v${CACHE_VERSION}`;

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker: Installing version', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Caching static assets');
        return cache.addAll(
          STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' }))
        ).catch(error => {
          console.warn('⚠️ Some assets failed to cache:', error);
          // Don't fail installation if some assets can't be cached
          return Promise.resolve();
        });
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker: Activating version', CACHE_VERSION);
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete caches that don't match current version
            if (
              cacheName.startsWith('farmsight-') && 
              !cacheName.includes(CACHE_VERSION)
            ) {
              console.log('🗑️ Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Helper function to determine cache strategy
function getCacheStrategy(url) {
  const urlObj = new URL(url);
  
  // Images - cache first, network fallback
  if (urlObj.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    return 'cacheFirst';
  }
  
  // API calls - network first, cache fallback
  if (urlObj.hostname.includes('supabase.co') || 
      urlObj.hostname.includes('unsplash.com')) {
    return 'networkFirst';
  }
  
  // Static assets - cache first
  if (urlObj.pathname.match(/\.(css|js|woff|woff2|ttf|eot)$/)) {
    return 'cacheFirst';
  }
  
  // HTML - network first
  if (urlObj.pathname.match(/\.html$/) || urlObj.pathname === '/') {
    return 'networkFirst';
  }
  
  return 'networkFirst';
}

// Cache-first strategy
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    // Update cache in background
    fetchAndCache(request, cacheName).catch(() => {});
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cacheResponse(request, response.clone(), cacheName);
    }
    return response;
  } catch (error) {
    return new Response('Offline', { status: 503 });
  }
}

// Network-first strategy
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request.clone());
    if (response.ok) {
      // Cache successful responses
      await cacheResponse(request, response.clone(), cacheName);
    }
    return response;
  } catch (error) {
    // Network failed, try cache
    const cached = await caches.match(request);
    if (cached) {
      // Add offline header
      const headers = new Headers(cached.headers);
      headers.set('X-Offline', 'true');
      return new Response(cached.body, {
        status: cached.status,
        statusText: cached.statusText,
        headers: headers
      });
    }
    
    // No cache available
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    
    return new Response(
      JSON.stringify({ 
        offline: true, 
        error: 'No internet connection',
        message: 'This data is not available offline yet. Please try again when online.' 
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 503
      }
    );
  }
}

// Helper to cache a response
async function cacheResponse(request, response, cacheName) {
  if (!response || response.status !== 200) {
    return;
  }
  
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
}

// Helper to fetch and cache
async function fetchAndCache(request, cacheName) {
  const response = await fetch(request);
  if (response.ok) {
    await cacheResponse(request, response.clone(), cacheName);
  }
  return response;
}

// Fetch event - main request handler
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip chrome extensions and non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip requests to extensions
  if (url.hostname === 'localhost' && url.port && url.port !== location.port) {
    return;
  }

  // Determine cache name based on request type
  let cacheName = DYNAMIC_CACHE;
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    cacheName = IMAGE_CACHE;
  } else if (url.hostname.includes('supabase.co')) {
    cacheName = API_CACHE;
  }

  // Get appropriate cache strategy
  const strategy = getCacheStrategy(request.url);

  event.respondWith(
    (async () => {
      if (strategy === 'cacheFirst') {
        return cacheFirst(request, cacheName);
      } else {
        return networkFirst(request, cacheName);
      }
    })()
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urlsToCache = event.data.urls || [];
    event.waitUntil(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return Promise.all(
          urlsToCache.map(url => 
            fetch(url).then(response => {
              if (response.ok) {
                return cache.put(url, response);
              }
            }).catch(() => {})
          )
        );
      })
    );
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }).then(() => {
        event.ports[0].postMessage({ success: true });
      })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('🔄 Service Worker: Background sync', event.tag);
  
  if (event.tag === 'sync-offline-data') {
    event.waitUntil(syncOfflineData());
  }
});

async function syncOfflineData() {
  console.log('📤 Service Worker: Syncing offline data...');
  // Notify all clients to sync their data
  const clients = await self.clients.matchAll();
  clients.forEach((client) => {
    client.postMessage({
      type: 'SYNC_REQUIRED'
    });
  });
}

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  console.log('⏰ Service Worker: Periodic sync', event.tag);
  
  if (event.tag === 'sync-market-prices') {
    event.waitUntil(syncMarketPrices());
  }
});

async function syncMarketPrices() {
  console.log('💰 Service Worker: Syncing market prices...');
  const clients = await self.clients.matchAll();
  clients.forEach((client) => {
    client.postMessage({
      type: 'SYNC_MARKET_PRICES'
    });
  });
}

console.log('✅ Service Worker loaded, version:', CACHE_VERSION);