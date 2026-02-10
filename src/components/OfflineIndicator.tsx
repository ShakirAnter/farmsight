import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);
  const [justCameOnline, setJustCameOnline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setJustCameOnline(true);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setJustCameOnline(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setJustCameOnline(false);
      setShowNotification(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {/* Persistent indicator when offline */}
      {!isOnline && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3 text-center z-50 shadow-lg"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm font-semibold">Offline Mode</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="text-sm font-medium">
                Working locally - Data will sync when connection is restored
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Notification toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className={`fixed top-20 right-4 ${
              isOnline 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                : 'bg-gradient-to-r from-orange-500 to-amber-500'
            } text-white px-6 py-4 rounded-lg shadow-2xl z-50 min-w-[300px]`}
          >
            <div className="flex items-center gap-4">
              {isOnline ? (
                <div className="bg-white/20 p-2 rounded-full">
                  <Wifi className="h-6 w-6" />
                </div>
              ) : (
                <div className="bg-white/20 p-2 rounded-full">
                  <WifiOff className="h-6 w-6" />
                </div>
              )}
              <div className="flex-1">
                <div className="font-bold text-lg">
                  {isOnline ? 'Back Online!' : 'You\'re Offline'}
                </div>
                <div className="text-sm opacity-95">
                  {isOnline
                    ? justCameOnline 
                      ? 'Syncing your data...'
                      : 'All systems connected'
                    : 'App continues to work normally'}
                </div>
              </div>
              {isOnline && justCameOnline && (
                <div className="animate-spin">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}