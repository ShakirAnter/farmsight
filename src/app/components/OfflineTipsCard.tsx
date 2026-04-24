import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Wifi, Download, Database, Sync, X, Info } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function OfflineTipsCard() {
  const [showTips, setShowTips] = useState(() => {
    // Only show if user hasn't dismissed before
    return !localStorage.getItem('offline-tips-dismissed');
  });

  const handleDismiss = () => {
    localStorage.setItem('offline-tips-dismissed', 'true');
    setShowTips(false);
  };

  if (!showTips) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800 shadow-lg relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
          </div>

          <CardHeader className="relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                  <Info className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl dark:text-white">
                    📱 FarmSight Works Offline!
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Manage your farm anytime, anywhere
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tip 1 */}
              <div className="flex gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-lg h-fit">
                  <Wifi className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Works Without Internet
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Access your farm data, add crops, and generate reports even when offline
                  </p>
                </div>
              </div>

              {/* Tip 2 */}
              <div className="flex gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50">
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-2 rounded-lg h-fit">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Install as App
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Add to your home screen for faster access and better offline performance
                  </p>
                </div>
              </div>

              {/* Tip 3 */}
              <div className="flex gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50">
                <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-2 rounded-lg h-fit">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Data Saved Locally
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    All your changes are stored on your device and never lost
                  </p>
                </div>
              </div>

              {/* Tip 4 */}
              <div className="flex gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 p-2 rounded-lg h-fit">
                  <Sync className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Auto-Sync
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    When you reconnect, everything syncs automatically to the cloud
                  </p>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-300/30 dark:border-blue-700/30">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>💡 Pro Tip:</strong> Try disconnecting your internet and see how the app continues to work seamlessly! Your data will sync automatically when you reconnect.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
