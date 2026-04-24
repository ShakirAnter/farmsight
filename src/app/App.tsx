import { useState, useEffect } from 'react'
import { EnhancedDashboard } from './components/EnhancedDashboard'
import { InfoPage } from './components/InfoPage'
import { FeedbackPage } from './components/FeedbackPage'
import { BackgroundSlideshow } from './components/BackgroundSlideshow'
import { Footer } from './components/Footer'
import { PWAInstallPrompt } from './components/PWAInstallPrompt'
import { ErrorBoundary } from './components/ErrorBoundary'
import { offlineStorage } from './utils/offlineStorage'
import { offlineSync } from './utils/offlineSync'
import { networkStatus } from './utils/networkStatus'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { Toaster } from './components/ui/sonner'
import { SEOHead } from './components/SEOHead'

type View = 'dashboard' | 'info' | 'feedback'

function AppContent() {
  const [view, setView] = useState<View>('dashboard')
  const [username, setUsername] = useState<string>('Farmer')
  const [loading, setLoading] = useState(true)

  // Initialize offline storage and service worker
  useEffect(() => {
    // Wrap everything in try-catch for Figma preview environment
    try {
      // Initialize IndexedDB only if available
      if (typeof window !== 'undefined' && window.indexedDB) {
        offlineStorage.init().catch(() => {
          // Silently fail - app works without IndexedDB
        });
      }

      // Register service worker only in production environments
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.location.protocol === 'https:') {
        const registerSW = async () => {
          try {
            const registration = await navigator.serviceWorker.register('/sw.js', {
              scope: '/',
              updateViaCache: 'none'
            });
            
            // Check for updates on page load
            registration.update();
            
            // Listen for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('🔄 New version available!');
                  }
                });
              }
            });

            // Listen for messages from service worker
            navigator.serviceWorker.addEventListener('message', (event) => {
              if (event.data && event.data.type === 'SYNC_REQUIRED') {
                offlineSync.syncData();
              }
            });
          } catch (error) {
            // App continues to work without service worker
          }
        };

        registerSW();
      }

      // Setup online/offline sync only if available
      if (typeof window !== 'undefined' && 'addEventListener' in window) {
        offlineSync.setupListeners(
          () => {
            // On online
            offlineSync.syncData();
          },
          () => {
            // On offline - no action needed
          }
        );
      }
    } catch (error) {
      // Silently handle any initialization errors
      console.log('Initialization skipped in preview mode');
    }
  }, []);

  // Check for existing username on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check localStorage for saved username only if available
        if (typeof window !== 'undefined' && window.localStorage) {
          const localAuth = localStorage.getItem('farmsight_auth');
          if (localAuth) {
            try {
              const authData = JSON.parse(localAuth);
              setUsername(authData.username || 'Farmer');
            } catch (error) {
              // Invalid auth data - use default
              setUsername('Farmer');
            }
          }
        }
      } catch (error) {
        // Silently fail in preview environments
      }
      
      setLoading(false);
    }

    checkSession();
  }, []);

  if (loading) {
    return (
      <BackgroundSlideshow>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="text-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading FarmSight...</p>
          </div>
          <Footer variant="dark" />
        </div>
      </BackgroundSlideshow>
    )
  }

  if (view === 'info') {
    return (
      <>
        <PWAInstallPrompt />
        <InfoPage onBack={() => setView('dashboard')} />
      </>
    )
  }

  if (view === 'feedback') {
    return (
      <>
        <PWAInstallPrompt />
        <FeedbackPage 
          onBack={() => setView('dashboard')} 
          username={username}
        />
      </>
    )
  }

  // Main dashboard view - always accessible
  return (
    <>
      <PWAInstallPrompt />
      <EnhancedDashboard
        username={username}
        accessToken=""
        onSwitchToFeedback={() => setView('feedback')}
      />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SEOHead />
        <Toaster />
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </ThemeProvider>
    </LanguageProvider>
  );
}