import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, CloudOff, RefreshCw, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { Button } from './ui/button';
import { offlineStorage } from '../utils/offlineStorage';
import { offlineSync } from '../utils/offlineSync';

export function OfflineStatusBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    checkPendingItems();

    const handleOnline = () => {
      setIsOnline(true);
      setDismissed(false);
      syncNow();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setDismissed(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check pending items every 30 seconds
    const interval = setInterval(checkPendingItems, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Show banner if offline or has pending items
    setShowBanner((!isOnline || pendingCount > 0) && !dismissed);
  }, [isOnline, pendingCount, dismissed]);

  const checkPendingItems = async () => {
    try {
      const queue = await offlineStorage.getSyncQueue();
      setPendingCount(queue.length);
    } catch (error) {
      console.error('Failed to check pending items:', error);
    }
  };

  const syncNow = async () => {
    if (!isOnline) return;

    setSyncing(true);
    try {
      await offlineSync.syncData();
      await checkPendingItems();
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setSyncing(false);
    }
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className={`fixed top-16 left-0 right-0 z-40 ${
          isOnline 
            ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700'
            : 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500'
        } text-white shadow-lg`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {isOnline ? (
                <div className="bg-white/20 p-2 rounded-full">
                  {syncing ? (
                    <RefreshCw className="h-5 w-5 animate-spin" />
                  ) : pendingCount > 0 ? (
                    <Cloud className="h-5 w-5" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5" />
                  )}
                </div>
              ) : (
                <div className="bg-white/20 p-2 rounded-full">
                  <CloudOff className="h-5 w-5" />
                </div>
              )}

              <div className="flex-1">
                <p className="font-semibold text-base">
                  {isOnline ? (
                    syncing ? (
                      'Syncing your data...'
                    ) : pendingCount > 0 ? (
                      `${pendingCount} item${pendingCount !== 1 ? 's' : ''} waiting to sync`
                    ) : (
                      'All data synced ✓'
                    )
                  ) : (
                    'Working Offline'
                  )}
                </p>
                <p className="text-sm opacity-90">
                  {isOnline ? (
                    pendingCount > 0 ? (
                      'Your offline changes are being uploaded'
                    ) : (
                      'Everything is up to date with the cloud'
                    )
                  ) : (
                    `${pendingCount > 0 ? `${pendingCount} change${pendingCount !== 1 ? 's' : ''} saved locally - ` : ''}Will sync when connection is restored`
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isOnline && pendingCount > 0 && !syncing && (
                <Button
                  onClick={syncNow}
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/40"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Now
                </Button>
              )}
              
              <button
                onClick={() => setDismissed(true)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Progress bar when syncing */}
          {syncing && (
            <motion.div
              className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
