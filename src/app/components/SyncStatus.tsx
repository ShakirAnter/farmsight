import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, CloudOff, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { offlineSync } from '../utils/offlineSync';
import { offlineStorage } from '../utils/offlineStorage';

type SyncState = 'synced' | 'syncing' | 'offline' | 'error';

export function SyncStatus() {
  const [syncState, setSyncState] = useState<SyncState>('synced');
  const [pendingItems, setPendingItems] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check initial sync queue
    checkSyncQueue();

    // Monitor online/offline status
    const handleOnline = () => {
      setSyncState('syncing');
      syncData();
    };

    const handleOffline = () => {
      setSyncState('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set up periodic check for sync queue
    const interval = setInterval(checkSyncQueue, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const checkSyncQueue = async () => {
    try {
      const queue = await offlineStorage.getSyncQueue();
      setPendingItems(queue.length);
      
      if (!navigator.onLine) {
        setSyncState('offline');
      } else if (queue.length > 0) {
        setSyncState('syncing');
        syncData();
      } else {
        setSyncState('synced');
      }
    } catch (error) {
      console.error('Failed to check sync queue:', error);
    }
  };

  const syncData = async () => {
    try {
      await offlineSync.syncData();
      await checkSyncQueue();
      setSyncState('synced');
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncState('error');
      // Retry after delay
      setTimeout(checkSyncQueue, 10000);
    }
  };

  const getStatusConfig = () => {
    switch (syncState) {
      case 'synced':
        return {
          icon: CheckCircle2,
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-100 dark:bg-green-900/30',
          borderColor: 'border-green-300 dark:border-green-700',
          label: 'Synced',
          message: 'All data is up to date'
        };
      case 'syncing':
        return {
          icon: Loader2,
          color: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-100 dark:bg-blue-900/30',
          borderColor: 'border-blue-300 dark:border-blue-700',
          label: 'Syncing',
          message: `Syncing ${pendingItems} item${pendingItems !== 1 ? 's' : ''}...`
        };
      case 'offline':
        return {
          icon: CloudOff,
          color: 'text-orange-600 dark:text-orange-400',
          bgColor: 'bg-orange-100 dark:bg-orange-900/30',
          borderColor: 'border-orange-300 dark:border-orange-700',
          label: 'Offline',
          message: pendingItems > 0 
            ? `${pendingItems} item${pendingItems !== 1 ? 's' : ''} pending sync`
            : 'Working offline'
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-100 dark:bg-red-900/30',
          borderColor: 'border-red-300 dark:border-red-700',
          label: 'Sync Error',
          message: 'Failed to sync. Will retry automatically.'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <motion.button
        onClick={() => setShowDetails(!showDetails)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg border-2 ${config.bgColor} ${config.borderColor} transition-all hover:scale-105`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon 
          className={`h-5 w-5 ${config.color} ${syncState === 'syncing' ? 'animate-spin' : ''}`}
        />
        <span className={`font-medium ${config.color}`}>
          {config.label}
        </span>
      </motion.button>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`mt-2 p-4 rounded-lg shadow-lg border-2 ${config.bgColor} ${config.borderColor}`}
          >
            <p className={`text-sm ${config.color}`}>
              {config.message}
            </p>
            {pendingItems > 0 && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Will sync when online
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
