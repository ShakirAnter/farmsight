import { offlineStorage } from './offlineStorage';
import { projectId, publicAnonKey } from './supabase/info';

export class OfflineSync {
  private syncInProgress = false;

  // Check if online
  isOnline(): boolean {
    return navigator.onLine;
  }

  // Setup online/offline listeners
  setupListeners(onOnline?: () => void, onOffline?: () => void): void {
    window.addEventListener('online', () => {
      console.log('🌐 Connection restored - syncing data...');
      if (onOnline) onOnline();
      this.syncData();
    });

    window.addEventListener('offline', () => {
      console.log('📡 Connection lost - working offline');
      if (onOffline) onOffline();
    });
  }

  // Sync all queued data
  async syncData(): Promise<void> {
    if (this.syncInProgress || !this.isOnline()) {
      return;
    }

    this.syncInProgress = true;

    try {
      const syncQueue = await offlineStorage.getSyncQueue();
      console.log(`📤 Syncing ${syncQueue.length} items...`);

      for (const item of syncQueue) {
        try {
          await this.syncItem(item);
          await offlineStorage.removeSyncQueueItem(item.id);
          console.log('✅ Synced item:', item.id);
        } catch (error) {
          console.error('❌ Failed to sync item:', item.id, error);
          // Keep item in queue to retry later
        }
      }

      console.log('✅ Sync complete');
    } catch (error) {
      console.error('❌ Sync error:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  // Sync individual item
  private async syncItem(item: any): Promise<void> {
    const { type, data } = item;

    switch (type) {
      case 'SIGNUP':
        await this.syncSignup(data);
        break;
      case 'CROP_DATA':
        await this.syncCropData(data);
        break;
      case 'FEEDBACK':
        await this.syncFeedback(data);
        break;
      default:
        console.warn('Unknown sync type:', type);
    }
  }

  // Sync signup
  private async syncSignup(data: any): Promise<void> {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-f40baa9e/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(data)
      }
    );

    if (!response.ok) {
      throw new Error('Signup sync failed');
    }
  }

  // Sync crop data
  private async syncCropData(data: any): Promise<void> {
    // This would sync to your backend
    // For now, just log it
    console.log('Syncing crop data:', data);
  }

  // Sync feedback
  private async syncFeedback(data: any): Promise<void> {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-f40baa9e/feedback`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(data)
      }
    );

    if (!response.ok) {
      throw new Error('Feedback sync failed');
    }
  }

  // Queue action for later sync
  async queueForSync(type: string, data: any): Promise<void> {
    await offlineStorage.addToSyncQueue({ type, data });
    console.log('📋 Queued for sync:', type);
  }
}

// Singleton instance
export const offlineSync = new OfflineSync();
