import { useState } from 'react'
import { Home, Calendar, TrendingUp, BookOpen, Bug, GraduationCap, Info, GitCompare, Menu, MessageSquare, Moon, Sun, Globe, Download } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { DashboardHome } from './dashboard/DashboardHome'
import { FarmingCalendar } from './dashboard/FarmingCalendar'
import { CropComparison } from './dashboard/CropComparison'
import { MarketPrices } from './dashboard/MarketPrices'
import { FarmingTips } from './dashboard/FarmingTips'
import { DiseaseGuide } from './dashboard/DiseaseGuide'
import { Tutorials } from './dashboard/Tutorials'
import { AboutPage } from './AboutPage'
import { FeedbackPage } from './FeedbackPage'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { Language } from '../utils/translations'
import { DashboardBackgroundSlideshow } from './DashboardBackgroundSlideshow'
import { ShareButton } from './ShareButton'
import { Footer } from './Footer'
import { usePWAInstall } from '../hooks/usePWAInstall'
import { toast } from 'sonner@2.0.3'
import logoImage from 'figma:asset/64b13f9d2c96fcfd2df5bbb31b4ae89d8ec5929a.png'

interface EnhancedDashboardProps {
  username: string
  accessToken: string
  onSwitchToFeedback: () => void
}

type DashboardView = 
  | 'home'
  | 'calendar'
  | 'comparison'
  | 'market'
  | 'tips'
  | 'diseases'
  | 'tutorials'
  | 'about'
  | 'feedback'

export function EnhancedDashboard({ username, accessToken, onSwitchToFeedback }: EnhancedDashboardProps) {
  const [currentView, setCurrentView] = useState<DashboardView>('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const { language, setLanguage, t } = useLanguage()
  const { darkMode, toggleDarkMode } = useTheme()
  const { isInstallable, isInstalled, installApp } = usePWAInstall()

  const handleInstallClick = async () => {
    // If already installed, show a message
    if (isInstalled) {
      toast.success('FarmSight is already installed! 🎉', {
        description: 'Access it from your home screen or app drawer.',
      })
      return
    }

    // Always show manual installation instructions based on platform
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isAndroid = /Android/.test(navigator.userAgent)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    const isEdge = /Edg/.test(navigator.userAgent)
    const isFirefox = /Firefox/.test(navigator.userAgent)
    
    if (isIOS) {
      toast.info('📱 Install FarmSight on iOS', {
        description: '1. Tap the Share button (⬆️) at the bottom\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to confirm\n4. FarmSight icon will appear on your home screen!',
        duration: 10000,
      })
    } else if (isAndroid && isChrome) {
      toast.info('📱 Install FarmSight on Android Chrome', {
        description: '1. Tap the menu icon (⋮) in the top-right corner\n2. Select "Install app" or "Add to Home screen"\n3. Tap "Install" to confirm\n4. FarmSight will be added to your app drawer!',
        duration: 10000,
      })
    } else if (isAndroid) {
      toast.info('📱 Install FarmSight on Android', {
        description: '1. Tap the browser menu (⋮)\n2. Look for "Add to Home screen" or "Install"\n3. Confirm to install\n4. FarmSight will appear in your apps!',
        duration: 10000,
      })
    } else if (isChrome || isEdge) {
      toast.info('💻 Install FarmSight on Desktop', {
        description: '1. Look for the install icon (⊕ or 🔽) in the address bar (right side)\n2. Click the icon\n3. Click "Install" in the popup\n4. FarmSight will open as a standalone app!\n\nAlternative: Click browser menu (⋮) → "Install FarmSight..."',
        duration: 12000,
      })
    } else if (isFirefox) {
      toast.info('💻 Install FarmSight on Firefox', {
        description: '1. Click the menu icon (☰) in the top-right\n2. Select "Install FarmSight"\n3. Confirm installation\n4. App will open in its own window!',
        duration: 10000,
      })
    } else if (isSafari) {
      toast.info('💻 Install FarmSight on Safari', {
        description: 'Desktop Safari doesn\'t support PWA installation.\n\nFor iPhone/iPad:\n1. Tap Share (⬆️)\n2. "Add to Home Screen"\n3. Tap "Add"',
        duration: 10000,
      })
    } else {
      toast.info('💻 Install FarmSight', {
        description: '1. Look for an install icon (⊕) in your browser address bar\n2. Or check your browser menu for "Install" or "Add to Home Screen"\n3. Follow the prompts to install\n4. Enjoy FarmSight as a standalone app!',
        duration: 10000,
      })
    }
  }

  const menuItems = [
    { id: 'home', label: t('dashboard'), icon: Home, color: 'emerald' },
    { id: 'calendar', label: t('calendar'), icon: Calendar, color: 'purple' },
    { id: 'comparison', label: t('cropComparison'), icon: GitCompare, color: 'blue' },
    { id: 'market', label: t('marketPrices'), icon: TrendingUp, color: 'orange' },
    { id: 'tips', label: t('farmingTips'), icon: BookOpen, color: 'teal' },
    { id: 'diseases', label: t('diseaseGuide'), icon: Bug, color: 'rose' },
    { id: 'tutorials', label: t('tutorials'), icon: GraduationCap, color: 'indigo' },
    { id: 'about', label: 'About', icon: Info, color: 'cyan' },
    { id: 'feedback', label: t('feedback'), icon: MessageSquare, color: 'amber' },
  ]

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <DashboardHome username={username} accessToken={accessToken} onReportGenerated={() => setRefreshTrigger(prev => prev + 1)} t={t} />
      case 'calendar':
        return <FarmingCalendar />
      case 'comparison':
        return <CropComparison />
      case 'market':
        return <MarketPrices />
      case 'tips':
        return <FarmingTips />
      case 'diseases':
        return <DiseaseGuide />
      case 'tutorials':
        return <Tutorials />
      case 'about':
        return <AboutPage />
      case 'feedback':
        return <FeedbackPage onBack={() => setCurrentView('home')} username={username} />
      default:
        return <DashboardHome username={username} accessToken={accessToken} onReportGenerated={() => setRefreshTrigger(prev => prev + 1)} t={t} />
    }
  }

  const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => {
    const getMenuItemClasses = (itemId: string, color: string) => {
      const isActive = currentView === itemId
      if (!isActive) {
        return darkMode 
          ? 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:shadow-md hover:border hover:border-gray-600' 
          : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md'
      }
      
      // Define vibrant gradient color classes for each menu item
      const colorClasses: { [key: string]: string } = {
        'emerald': darkMode 
          ? 'bg-gradient-to-br from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-900/50 border-2 border-emerald-400 font-semibold' 
          : 'bg-gradient-to-br from-emerald-400 via-green-400 to-emerald-500 text-white shadow-xl shadow-emerald-500/50 border-2 border-emerald-300 font-semibold',
        'purple': darkMode 
          ? 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-900/50 border-2 border-purple-400 font-semibold' 
          : 'bg-gradient-to-br from-purple-400 via-violet-400 to-purple-500 text-white shadow-xl shadow-purple-500/50 border-2 border-purple-300 font-semibold',
        'blue': darkMode 
          ? 'bg-gradient-to-br from-blue-600 to-sky-600 text-white shadow-lg shadow-blue-900/50 border-2 border-blue-400 font-semibold' 
          : 'bg-gradient-to-br from-blue-400 via-sky-400 to-blue-500 text-white shadow-xl shadow-blue-500/50 border-2 border-blue-300 font-semibold',
        'orange': darkMode 
          ? 'bg-gradient-to-br from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-900/50 border-2 border-orange-400 font-semibold' 
          : 'bg-gradient-to-br from-orange-400 via-amber-400 to-orange-500 text-white shadow-xl shadow-orange-500/50 border-2 border-orange-300 font-semibold',
        'teal': darkMode 
          ? 'bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-900/50 border-2 border-teal-400 font-semibold' 
          : 'bg-gradient-to-br from-teal-400 via-cyan-400 to-teal-500 text-white shadow-xl shadow-teal-500/50 border-2 border-teal-300 font-semibold',
        'rose': darkMode 
          ? 'bg-gradient-to-br from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-900/50 border-2 border-rose-400 font-semibold' 
          : 'bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500 text-white shadow-xl shadow-rose-500/50 border-2 border-rose-300 font-semibold',
        'indigo': darkMode 
          ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-900/50 border-2 border-indigo-400 font-semibold' 
          : 'bg-gradient-to-br from-indigo-400 via-blue-400 to-indigo-500 text-white shadow-xl shadow-indigo-500/50 border-2 border-indigo-300 font-semibold',
        'cyan': darkMode 
          ? 'bg-gradient-to-br from-cyan-600 to-teal-600 text-white shadow-lg shadow-cyan-900/50 border-2 border-cyan-400 font-semibold' 
          : 'bg-gradient-to-br from-cyan-400 via-teal-400 to-cyan-500 text-white shadow-xl shadow-cyan-500/50 border-2 border-cyan-300 font-semibold',
        'amber': darkMode 
          ? 'bg-gradient-to-br from-amber-600 to-yellow-600 text-white shadow-lg shadow-amber-900/50 border-2 border-amber-400 font-semibold' 
          : 'bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-white shadow-xl shadow-amber-500/50 border-2 border-amber-300 font-semibold',
      }
      
      return colorClasses[color] || (darkMode ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg' : 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-xl')
    }

    return (
      <div className={`${darkMode ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 border-gray-700' : 'bg-gradient-to-b from-white via-gray-50 to-white border-gray-200'} ${isMobile ? 'w-full' : 'w-64'} h-full border-r flex flex-col shadow-xl`}>
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-md opacity-50"></div>
              <img src={logoImage} alt="Logo" className="relative w-16 h-16 object-contain" />
            </div>
            <div>
              <h2 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-bold`}>Uganda Farmer Portal</h2>
              <p className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-600'} font-medium`}>Welcome, {username}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id as DashboardView)
                  if (isMobile) setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${getMenuItemClasses(item.id, item.color)}`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className={`flex-1 px-2 py-1 rounded text-sm ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'
              }`}
            >
              <option value="en">English</option>
              <option value="lg">Luganda</option>
              <option value="sw">Swahili</option>
            </select>
          </div>

          {/* Dark Mode Toggle */}
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {darkMode ? t('lightMode') : t('darkMode')}
          </Button>

          {/* PWA Install Button - Always visible */}
          <Button
            variant={isInstalled ? "outline" : "default"}
            className={`w-full justify-start gap-2 ${
              !isInstalled && isInstallable 
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-green-500/50 animate-pulse' 
                : ''
            }`}
            onClick={handleInstallClick}
            disabled={isInstalled}
          >
            <Download className="h-4 w-4" />
            {isInstalled 
              ? (language === 'lg' ? 'Yateekeddwa' : language === 'sw' ? 'Imesakinishwa' : 'Installed ✓')
              : (language === 'lg' ? 'Teeka ku Ssimu' : language === 'sw' ? 'Sakinisha' : 'Install App')
            }
          </Button>
        </div>
      </div>
    )
  }

  return (
    <DashboardBackgroundSlideshow>
      <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-80">
            <Sidebar isMobile />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <header className={`lg:hidden ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white/90 backdrop-blur-sm'} border-b shadow-sm sticky top-0 z-10`}>
            <div className="px-4 py-3 flex items-center justify-between">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              <div className="flex items-center gap-2">
                <img src={logoImage} alt="Logo" className="w-8 h-8 object-contain" />
                <h1 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-semibold`}>FarmSight</h1>
              </div>
              <ShareButton variant="ghost" size="sm" />
            </div>
          </header>

          {/* Desktop Header - Share Button */}
          <div className={`hidden lg:flex ${darkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-white/90 backdrop-blur-sm border-gray-200'} border-b shadow-sm sticky top-0 z-10 px-8 py-3 justify-between items-center`}>
            <h1 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold`}>
              {menuItems.find(item => item.id === currentView)?.label || 'Dashboard'}
            </h1>
            <ShareButton variant="outline" size="default" />
          </div>

          {/* Main Content Area */}
          <main className={`flex-1 overflow-y-auto ${darkMode ? 'bg-gray-900/50' : 'bg-white/50'} p-4 lg:p-8 relative`}>
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400/10 to-emerald-600/10 dark:from-green-500/5 dark:to-emerald-700/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-400/10 to-sky-600/10 dark:from-blue-500/5 dark:to-sky-700/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 dark:from-purple-500/5 dark:to-pink-700/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
            <div className="max-w-7xl mx-auto relative z-10">
              {renderContent()}
            </div>
          </main>

          <Footer variant="light" />
        </div>
      </div>
    </DashboardBackgroundSlideshow>
  )
}