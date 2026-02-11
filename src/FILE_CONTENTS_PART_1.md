# 📄 FARMSIGHT - FILE CONTENTS (PART 1 OF 3)

## 🔥 CRITICAL FILES - COPY THESE FIRST

---

## ✅ ALREADY PROVIDED IN EXPORT_GUIDE.MD:
- package.json
- vite.config.ts
- tsconfig.json
- tsconfig.node.json  
- index.html
- main.tsx
- .gitignore
- README.md

---

## 📁 APP.TSX (Main Entry Point)

**Path:** `/App.tsx`

```typescript
import { useState, useEffect } from 'react'
import { LoginPage } from './components/LoginPage'
import { SignupPage } from './components/SignupPage'
import { EnhancedDashboard } from './components/EnhancedDashboard'
import { InfoPage } from './components/InfoPage'
import { FeedbackPage } from './components/FeedbackPage'
import { getSupabaseClient } from './utils/supabase/client'
import { BackgroundSlideshow } from './components/BackgroundSlideshow'
import { Footer } from './components/Footer'
import { OfflineIndicator } from './components/OfflineIndicator'
import { PWAInstallPrompt } from './components/PWAInstallPrompt'
import { offlineStorage } from './utils/offlineStorage'
import { offlineSync } from './utils/offlineSync'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { Toaster } from './components/ui/sonner'
import { OfflineStatusBanner } from './components/OfflineStatusBanner'
import { SEOHead } from './components/SEOHead'

type View = 'login' | 'signup' | 'dashboard' | 'info' | 'feedback'

function AppContent() {
  const [view, setView] = useState<View>('signup')
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string>('')
  const [loading, setLoading] = useState(true)

  // Initialize offline storage and service worker
  useEffect(() => {
    // Initialize IndexedDB
    offlineStorage.init().catch(console.error);

    // Register service worker (gracefully handle if not available)
    // Note: Service workers are not available in iframe/Figma preview environments
    if ('serviceWorker' in navigator && window.location.protocol === 'https:' && !window.location.hostname.includes('figma')) {
      // Use a timeout to prevent blocking
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          });
          console.log('✅ Service Worker registered:', registration);
          
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
          console.log('ℹ️ Service Worker not registered (not available in this environment)');
          // App continues to work without service worker
        }
      };

      // Register after a short delay to not block initial load
      setTimeout(registerSW, 1000);
    } else {
      console.warn('⚠️ Service Workers not supported in this browser');
    }

    // Setup online/offline sync
    offlineSync.setupListeners(
      () => {
        // On online
        console.log('🌐 Online - syncing data');
        offlineSync.syncData();
      },
      () => {
        // On offline
        console.log('📡 Offline - storing data locally');
      }
    );
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // First check offline storage (if available)
        const offlineAuth = await offlineStorage.getAuth();
        
        if (offlineAuth && offlineAuth.accessToken) {
          setAccessToken(offlineAuth.accessToken);
          setUsername(offlineAuth.username || 'Farmer');
          setView('dashboard');
          setLoading(false);
          return;
        }
      } catch (error) {
        console.warn('⚠️ Offline storage not available:', error);
        // Continue with normal flow
      }

      // Then check Supabase if online
      if (navigator.onLine) {
        try {
          const supabase = getSupabaseClient()

          const { data: { session } } = await supabase.auth.getSession()
          
          if (session?.access_token) {
            const user = session.user?.user_metadata?.username || session.user?.email?.split('@')[0] || 'Farmer';
            setAccessToken(session.access_token)
            setUsername(user)
            setView('dashboard')
            
            // Try to save to offline storage
            try {
              await offlineStorage.saveAuth({
                accessToken: session.access_token,
                username: user
              });
            } catch (error) {
              console.warn('⚠️ Could not save to offline storage:', error);
            }
          } else {
            // No existing session - check localStorage for hint about whether user has account
            const hasAccount = localStorage.getItem('hasAccount')
            setView(hasAccount === 'true' ? 'login' : 'signup')
          }
        } catch (error) {
          console.error('❌ Error checking session:', error);
          const hasAccount = localStorage.getItem('hasAccount')
          setView(hasAccount === 'true' ? 'login' : 'signup')
        }
      } else {
        // Offline and no cached auth - show signup
        const hasAccount = localStorage.getItem('hasAccount')
        setView(hasAccount === 'true' ? 'login' : 'signup')
      }
      
      setLoading(false)
    }

    checkSession()
  }, [])

  // Automatic logout when user leaves the page
  useEffect(() => {
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      // Only logout if user is logged in
      if (accessToken) {
        const supabase = getSupabaseClient()
        await supabase.auth.signOut()
        
        // Clear session state
        setAccessToken(null)
        setUsername('')
      }
    }

    const handlePageHide = async () => {
      // Only logout if user is logged in
      if (accessToken) {
        const supabase = getSupabaseClient()
        await supabase.auth.signOut()
      }
    }

    // Add event listeners for page unload
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('pagehide', handlePageHide)

    // Cleanup event listeners
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('pagehide', handlePageHide)
    }
  }, [accessToken])

  const handleLoginSuccess = (token: string, user: string) => {
    localStorage.setItem('hasAccount', 'true')
    setAccessToken(token)
    setUsername(user)
    setView('dashboard')
  }

  const handleSignupSuccess = () => {
    // Mark that user has an account now
    localStorage.setItem('hasAccount', 'true')
    // After successful signup, switch to login
    setView('login')
  }

  const handleLogout = async () => {
    const supabase = getSupabaseClient()

    await supabase.auth.signOut()
    setAccessToken(null)
    setUsername('')
    // User still has an account, so show login after logout
    setView('login')
  }

  if (loading) {
    return (
      <BackgroundSlideshow>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
          <Footer variant="dark" />
        </div>
      </BackgroundSlideshow>
    )
  }

  if (view === 'info') {
    return (
      <>
        <OfflineIndicator />
        <InfoPage onBack={() => setView('login')} />
      </>
    )
  }

  if (view === 'feedback') {
    return (
      <>
        <OfflineIndicator />
        <FeedbackPage 
          onBack={() => setView(accessToken ? 'dashboard' : 'login')} 
          username={username}
        />
      </>
    )
  }

  if (view === 'login') {
    return (
      <>
        <OfflineIndicator />
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignup={() => setView('signup')}
          onSwitchToInfo={() => setView('info')}
          onSwitchToFeedback={() => setView('feedback')}
        />
      </>
    )
  }

  if (view === 'signup') {
    return (
      <>
        <OfflineIndicator />
        <SignupPage
          onSignupSuccess={handleSignupSuccess}
          onSwitchToLogin={() => setView('login')}
          onSwitchToInfo={() => setView('info')}
          onSwitchToFeedback={() => setView('feedback')}
        />
      </>
    )
  }

  if (view === 'dashboard' && accessToken) {
    return (
      <>
        <OfflineIndicator />
        <OfflineStatusBanner />
        <PWAInstallPrompt />
        <EnhancedDashboard
          username={username}
          accessToken={accessToken}
          onLogout={handleLogout}
          onSwitchToFeedback={() => setView('feedback')}
        />
      </>
    )
  }

  return null
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SEOHead />
        <Toaster />
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}
```

---

## 📁 STYLES/GLOBALS.CSS

**Path:** `/styles/globals.css`

[Content already shown in earlier responses - see the file with all the CSS custom properties and Tailwind configuration]

---

## 📁 TYPES/INDEX.TS

**Path:** `/types/index.ts`

[Content already shown in earlier responses - contains all TypeScript interfaces]

---

## 📁 CONTEXTS/LANGUAGECONTEXT.TSX

**Path:** `/contexts/LanguageContext.tsx`

[Content already shown in earlier responses]

---

## 📁 CONTEXTS/THEMECONTEXT.TSX

**Path:** `/contexts/ThemeContext.tsx`

[Content already shown in earlier responses]

---

## 📁 UTILS/SUPABASE/CLIENT.TS

**Path:** `/utils/supabase/client.ts`

```typescript
import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './info'

// Singleton Supabase client to avoid multiple instances
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey,
      {
        auth: {
          persistSession: false, // Don't persist session for faster login
          autoRefreshToken: false, // Don't auto refresh for faster initial login
          detectSessionInUrl: false, // Skip URL session detection
          flowType: 'implicit' // Use implicit flow for faster auth
        },
        global: {
          headers: {
            'x-client-info': 'farmsight-web'
          }
        }
      }
    )
  }
  return supabaseClient
}
```

---

## 📁 UTILS/SUPABASE/INFO.TSX

**Path:** `/utils/supabase/info.tsx`

```typescript
/* AUTOGENERATED FILE - DO NOT EDIT CONTENTS */

export const projectId = "idbgvqilomnfpfgcgkrl"
export const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkYmd2cWlsb21uZnBmZ2Nna3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0ODU1MzIsImV4cCI6MjA3NzA2MTUzMn0.wbfsJgt0qoXTcSK1zvUT9QuN9mU0Y6fEP6asEThko_4"
```

---

## 📁 UTILS/TRANSLATIONS.TS

**Path:** `/utils/translations.ts`

[Content already shown in earlier responses - contains all English, Luganda, and Swahili translations]

---

## ⚠️ IMPORTANT NOTES

### Logo Image Fix Required

All component files that import the logo need to be modified:

**Current (Figma Make specific):**
```typescript
import logoImage from 'figma:asset/64b13f9d2c96fcfd2df5bbb31b4ae89d8ec5929a.png'
```

**Replace with (Local path):**
```typescript
const logoImage = '/logo.png'
```

**Files to modify:**
1. components/LoginPage.tsx
2. components/SignupPage.tsx
3. components/InfoPage.tsx
4. components/FeedbackPage.tsx
5. components/EnhancedDashboard.tsx

Then save your logo as: `public/logo.png`

---

**Continue to FILE_CONTENTS_PART_2.md for component files...**
