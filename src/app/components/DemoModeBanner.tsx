import { Info, WifiOff } from 'lucide-react';
import { motion } from 'motion/react';

export function DemoModeBanner() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3 text-center z-50 shadow-lg"
    >
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-semibold">Demo Mode</span>
        </div>
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <span className="text-sm font-medium">
            Running in demo mode - Data is stored locally in your browser
          </span>
        </div>
      </div>
      <div className="mt-1 text-xs opacity-90">
        Perfect for testing! All features work normally, but data won't sync to the cloud.
      </div>
    </motion.div>
  );
}
