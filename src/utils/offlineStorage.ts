// IndexedDB wrapper for offline data storage
const DB_NAME = 'FarmSightDB';
const DB_VERSION = 2; // Increased version for new stores
const STORES = {
  AUTH: 'auth',
  CROPS: 'crops',
  REPORTS: 'reports',
  SYNC_QUEUE: 'syncQueue',
  MARKET_PRICES: 'marketPrices',
  USER_SETTINGS: 'userSettings'
};

class OfflineStorage {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (!('indexedDB' in window)) {
      console.warn('⚠️ IndexedDB not supported in this environment');
      return;
    }

    return new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
          console.warn('⚠️ IndexedDB initialization failed:', request.error);
          resolve(); // Resolve anyway so app continues
        };
        
        request.onsuccess = () => {
          this.db = request.result;
          console.log('✅ IndexedDB initialized');
          resolve();
        };

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;

          // Create auth store
          if (!db.objectStoreNames.contains(STORES.AUTH)) {
            db.createObjectStore(STORES.AUTH, { keyPath: 'id' });
          }

          // Create crops store
          if (!db.objectStoreNames.contains(STORES.CROPS)) {
            const cropStore = db.createObjectStore(STORES.CROPS, { keyPath: 'id', autoIncrement: true });
            cropStore.createIndex('timestamp', 'timestamp', { unique: false });
            cropStore.createIndex('synced', 'synced', { unique: false });
          }

          // Create reports store
          if (!db.objectStoreNames.contains(STORES.REPORTS)) {
            const reportStore = db.createObjectStore(STORES.REPORTS, { keyPath: 'id', autoIncrement: true });
            reportStore.createIndex('timestamp', 'timestamp', { unique: false });
          }

          // Create sync queue store
          if (!db.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
            const syncStore = db.createObjectStore(STORES.SYNC_QUEUE, { keyPath: 'id', autoIncrement: true });
            syncStore.createIndex('timestamp', 'timestamp', { unique: false });
            syncStore.createIndex('type', 'type', { unique: false });
          }

          // Create market prices store
          if (!db.objectStoreNames.contains(STORES.MARKET_PRICES)) {
            const pricesStore = db.createObjectStore(STORES.MARKET_PRICES, { keyPath: 'id' });
            pricesStore.createIndex('timestamp', 'timestamp', { unique: false });
          }

          // Create user settings store
          if (!db.objectStoreNames.contains(STORES.USER_SETTINGS)) {
            db.createObjectStore(STORES.USER_SETTINGS, { keyPath: 'key' });
          }
        };
      } catch (error) {
        console.warn('⚠️ Failed to open IndexedDB:', error);
        resolve(); // Resolve anyway so app continues
      }
    });
  }

  private async ensureDB(): Promise<IDBDatabase> {
    if (!this.db) {
      await this.init();
    }
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }

  // Auth methods
  async saveAuth(authData: any): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.AUTH], 'readwrite');
      const store = transaction.objectStore(STORES.AUTH);
      const request = store.put({ id: 'current', ...authData, timestamp: Date.now() });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getAuth(): Promise<any | null> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.AUTH], 'readonly');
      const store = transaction.objectStore(STORES.AUTH);
      const request = store.get('current');

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async clearAuth(): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.AUTH], 'readwrite');
      const store = transaction.objectStore(STORES.AUTH);
      const request = store.delete('current');

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Crop data methods
  async saveCrop(cropData: any): Promise<number> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.CROPS], 'readwrite');
      const store = transaction.objectStore(STORES.CROPS);
      const request = store.add({ ...cropData, timestamp: Date.now() });

      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  }

  async getCrops(): Promise<any[]> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.CROPS], 'readonly');
      const store = transaction.objectStore(STORES.CROPS);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async clearCrops(): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.CROPS], 'readwrite');
      const store = transaction.objectStore(STORES.CROPS);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Report methods
  async saveReport(reportData: any): Promise<number> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.REPORTS], 'readwrite');
      const store = transaction.objectStore(STORES.REPORTS);
      const request = store.add({ ...reportData, timestamp: Date.now() });

      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  }

  async getReports(): Promise<any[]> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.REPORTS], 'readonly');
      const store = transaction.objectStore(STORES.REPORTS);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  // Sync queue methods
  async addToSyncQueue(action: any): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.SYNC_QUEUE], 'readwrite');
      const store = transaction.objectStore(STORES.SYNC_QUEUE);
      const request = store.add({ ...action, timestamp: Date.now() });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getSyncQueue(): Promise<any[]> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.SYNC_QUEUE], 'readonly');
      const store = transaction.objectStore(STORES.SYNC_QUEUE);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async clearSyncQueue(): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.SYNC_QUEUE], 'readwrite');
      const store = transaction.objectStore(STORES.SYNC_QUEUE);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async removeSyncQueueItem(id: number): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.SYNC_QUEUE], 'readwrite');
      const store = transaction.objectStore(STORES.SYNC_QUEUE);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Market prices methods
  async saveMarketPrices(prices: any[]): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.MARKET_PRICES], 'readwrite');
      const store = transaction.objectStore(STORES.MARKET_PRICES);
      const request = store.put({ 
        id: 'current', 
        prices, 
        timestamp: Date.now() 
      });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getMarketPrices(): Promise<{ prices: any[], timestamp: number } | null> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.MARKET_PRICES], 'readonly');
      const store = transaction.objectStore(STORES.MARKET_PRICES);
      const request = store.get('current');

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  // User settings methods
  async saveSetting(key: string, value: any): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.USER_SETTINGS], 'readwrite');
      const store = transaction.objectStore(STORES.USER_SETTINGS);
      const request = store.put({ key, value, timestamp: Date.now() });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getSetting(key: string): Promise<any | null> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORES.USER_SETTINGS], 'readonly');
      const store = transaction.objectStore(STORES.USER_SETTINGS);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result?.value || null);
      request.onerror = () => reject(request.error);
    });
  }

  // Clear all data (useful for logout)
  async clearAllData(): Promise<void> {
    await Promise.all([
      this.clearAuth(),
      this.clearCrops(),
      this.clearSyncQueue()
    ]);
  }
}

// Singleton instance
export const offlineStorage = new OfflineStorage();