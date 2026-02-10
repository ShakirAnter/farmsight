import { offlineStorage } from './offlineStorage';
import { offlineSync } from './offlineSync';
import { toast } from 'sonner@2.0.3';

/**
 * Handles form submissions with offline support
 * Saves data locally if offline and queues for sync when online
 */
export const offlineFormHandler = {
  /**
   * Submit crop data with offline support
   */
  async submitCropData(cropData: any): Promise<{ success: boolean; offline: boolean }> {
    const isOffline = !navigator.onLine;

    try {
      if (isOffline) {
        // Save to IndexedDB
        await offlineStorage.saveCrop(cropData);
        
        // Add to sync queue
        await offlineSync.queueForSync('CROP_DATA', cropData);
        
        toast.success('Crop data saved locally! Will sync when online.', {
          description: 'Your data is safe and will be synchronized automatically.',
          duration: 4000,
        });

        return { success: true, offline: true };
      } else {
        // Online - save to IndexedDB and sync immediately
        await offlineStorage.saveCrop(cropData);
        
        // Try to sync to server
        try {
          await offlineSync.queueForSync('CROP_DATA', cropData);
          await offlineSync.syncData();
          
          toast.success('Crop data saved successfully!', {
            description: 'Your data has been saved and synced to the cloud.',
            duration: 3000,
          });
        } catch (error) {
          // If server sync fails, still saved locally
          toast.success('Crop data saved locally!', {
            description: 'Cloud sync will retry automatically.',
            duration: 3000,
          });
        }

        return { success: true, offline: false };
      }
    } catch (error) {
      console.error('Failed to save crop data:', error);
      
      toast.error('Failed to save crop data', {
        description: 'Please try again or check your storage.',
        duration: 4000,
      });

      return { success: false, offline: isOffline };
    }
  },

  /**
   * Submit feedback with offline support
   */
  async submitFeedback(feedbackData: any): Promise<{ success: boolean; offline: boolean }> {
    const isOffline = !navigator.onLine;

    try {
      if (isOffline) {
        // Queue for sync when online
        await offlineSync.queueForSync('FEEDBACK', feedbackData);
        
        toast.success('Feedback saved! Will send when online.', {
          description: 'Your feedback will be sent automatically when you reconnect.',
          duration: 4000,
        });

        return { success: true, offline: true };
      } else {
        // Online - send immediately
        await offlineSync.queueForSync('FEEDBACK', feedbackData);
        await offlineSync.syncData();
        
        toast.success('Feedback sent successfully!', {
          description: 'Thank you for your feedback!',
          duration: 3000,
        });

        return { success: true, offline: false };
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      
      toast.error('Failed to submit feedback', {
        description: 'Please try again later.',
        duration: 4000,
      });

      return { success: false, offline: isOffline };
    }
  },

  /**
   * Get all saved crops from offline storage
   */
  async getSavedCrops(): Promise<any[]> {
    try {
      return await offlineStorage.getCrops();
    } catch (error) {
      console.error('Failed to get saved crops:', error);
      return [];
    }
  },

  /**
   * Get pending sync items count
   */
  async getPendingSyncCount(): Promise<number> {
    try {
      const queue = await offlineStorage.getSyncQueue();
      return queue.length;
    } catch (error) {
      console.error('Failed to get pending sync count:', error);
      return 0;
    }
  },

  /**
   * Check if app is currently offline
   */
  isOffline(): boolean {
    return !navigator.onLine;
  },

  /**
   * Force sync all pending data
   */
  async forceSyncAll(): Promise<void> {
    if (!navigator.onLine) {
      toast.info('Cannot sync while offline', {
        description: 'Data will sync automatically when you reconnect.',
        duration: 3000,
      });
      return;
    }

    try {
      const count = await this.getPendingSyncCount();
      
      if (count === 0) {
        toast.info('Everything is already synced!', {
          duration: 2000,
        });
        return;
      }

      toast.loading(`Syncing ${count} item${count !== 1 ? 's' : ''}...`, {
        duration: Infinity,
        id: 'sync-toast',
      });

      await offlineSync.syncData();

      toast.success('All data synced successfully!', {
        id: 'sync-toast',
        duration: 3000,
      });
    } catch (error) {
      console.error('Force sync failed:', error);
      
      toast.error('Sync failed', {
        id: 'sync-toast',
        description: 'Will retry automatically.',
        duration: 3000,
      });
    }
  }
};
