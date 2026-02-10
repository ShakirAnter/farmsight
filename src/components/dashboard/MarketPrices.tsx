import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { TrendingUp, TrendingDown, Minus, Search, RefreshCw, Clock, WifiOff } from 'lucide-react'
import { Button } from '../ui/button'
import { projectId, publicAnonKey } from '../../utils/supabase/info'
import { offlineStorage } from '../../utils/offlineStorage'

interface MarketPrice {
  crop: string
  cropName: string
  market: string
  district: string
  pricePerKg: number
  price: number
  trend: string
  lastUpdated: string
}

export function MarketPrices() {
  const [searchQuery, setSearchQuery] = useState('')
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [usingCachedData, setUsingCachedData] = useState(false)

  const fetchMarketPrices = async (useCache = false) => {
    try {
      setLoading(true)
      
      // If offline or explicitly using cache, load from cache
      if (!navigator.onLine || useCache) {
        const cached = await offlineStorage.getMarketPrices()
        if (cached && cached.prices) {
          setMarketPrices(cached.prices)
          setLastFetchTime(new Date(cached.timestamp))
          setUsingCachedData(true)
          setLoading(false)
          return
        }
      }

      // Try to fetch from network
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f40baa9e/market-prices`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch market prices')
      }

      const data = await response.json()
      const prices = data.prices || []
      
      setMarketPrices(prices)
      setLastFetchTime(new Date())
      setUsingCachedData(false)
      
      // Cache the prices for offline use
      await offlineStorage.saveMarketPrices(prices).catch(err => 
        console.warn('Failed to cache market prices:', err)
      )
    } catch (error) {
      console.error('Error fetching market prices:', error)
      
      // Fall back to cached data
      const cached = await offlineStorage.getMarketPrices().catch(() => null)
      if (cached && cached.prices) {
        setMarketPrices(cached.prices)
        setLastFetchTime(new Date(cached.timestamp))
        setUsingCachedData(true)
      }
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchMarketPrices()
  }, [])

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false)
      setUsingCachedData(false)
      fetchMarketPrices() // Refresh when coming back online
    }
    
    const handleOffline = () => {
      setIsOffline(true)
      fetchMarketPrices(true) // Load from cache
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Auto-refresh every 30 seconds when enabled and online
  useEffect(() => {
    if (!autoRefresh || isOffline) return

    const interval = setInterval(() => {
      fetchMarketPrices()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [autoRefresh, isOffline])

  const filteredPrices = marketPrices.filter(price =>
    price.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    price.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
    price.district.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Group by crop
  const groupedPrices: { [key: string]: MarketPrice[] } = {}
  filteredPrices.forEach(price => {
    if (!groupedPrices[price.cropName]) {
      groupedPrices[price.cropName] = []
    }
    groupedPrices[price.cropName].push(price)
  })

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
      default: return <Minus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 dark:text-green-400'
      case 'down': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getAveragePriceForCrop = (cropName: string): number => {
    const prices = groupedPrices[cropName] || []
    if (prices.length === 0) return 0
    
    const sum = prices.reduce((acc, price) => acc + price.pricePerKg, 0)
    return Math.round(sum / prices.length)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="dark:text-white text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">Live Market Prices</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Real-time market prices for crops in Ugandan markets
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastFetchTime && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 px-3 py-2 rounded-lg backdrop-blur-sm">
              {usingCachedData ? (
                <>
                  <WifiOff className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  <span>Cached {lastFetchTime.toLocaleTimeString()}</span>
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  <span>Updated {lastFetchTime.toLocaleTimeString()}</span>
                </>
              )}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchMarketPrices()}
            disabled={loading || isOffline}
            className="gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-900/30 dark:via-amber-900/30 dark:to-yellow-900/30 border-2 border-orange-300 dark:border-orange-700 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">{isOffline ? '📱' : '💹'}</span>
            <div className="flex-1">
              <p className="dark:text-white mb-1 font-bold text-lg">
                <strong>{isOffline ? 'Offline Mode - Cached Prices' : 'Live Market Price Information'}</strong>
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {isOffline 
                  ? 'You are currently offline. Showing cached market prices. Data will refresh automatically when connection is restored.'
                  : 'Prices update automatically every 30 seconds from major markets across Uganda. Use this information to make better selling decisions and plan your crops strategically.'
                }
              </p>
              {!isOffline && (
                <div className="mt-3 flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 p-2 rounded-lg">
                  <input
                    type="checkbox"
                    id="autoRefresh"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="rounded accent-orange-600"
                  />
                  <label htmlFor="autoRefresh" className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer font-medium">
                    Auto-refresh enabled (every 30 seconds)
                  </label>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg border-2">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-500 dark:text-orange-400" />
            <Input
              placeholder="Search by crop, market, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 dark:bg-gray-700 dark:text-white border-2 border-gray-200 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-400 h-12 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {loading && marketPrices.length === 0 ? (
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-xl">
          <CardContent className="p-8 text-center">
            <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4 text-orange-600 dark:text-orange-400" />
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Loading market prices...</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Price Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedPrices).map(([cropName, prices]) => {
              const avgPrice = getAveragePriceForCrop(cropName)
              const highestPrice = Math.max(...prices.map(p => p.pricePerKg))
              const lowestPrice = Math.min(...prices.map(p => p.pricePerKg))

              return (
                <Card key={cropName} className="dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 bg-white dark:border-gray-600 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 shadow-lg">
                  <CardHeader className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 border-b-2 border-orange-200 dark:border-orange-700">
                    <div className="flex items-center justify-between">
                      <CardTitle className="dark:text-white text-xl font-bold">{cropName}</CardTitle>
                      <Badge className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white shadow-lg font-bold text-base px-3 py-1">
                        Avg: {avgPrice.toLocaleString()} UGX
                      </Badge>
                    </div>
                    <CardDescription className="dark:text-gray-200 text-gray-700 font-medium">
                      Range: {lowestPrice.toLocaleString()} - {highestPrice.toLocaleString()} UGX/kg
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {prices.map((price, index) => (
                        <div key={index} className="p-4 border-2 border-orange-200 dark:border-orange-800 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 dark:hover:from-orange-900/30 dark:hover:to-amber-900/30 transition-all duration-200 shadow-sm hover:shadow-md">
                          <div className="flex items-center justify-between mb-2">
                            <span className="dark:text-white font-bold text-base">{price.market}</span>
                            <div className="flex items-center gap-1">
                              {getTrendIcon(price.trend)}
                              <span className={`${getTrendColor(price.trend)} font-bold text-lg`}>
                                {price.pricePerKg.toLocaleString()} UGX
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium">{price.district}</span>
                            <span>Updated: {new Date(price.lastUpdated).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredPrices.length === 0 && (
            <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-xl">
              <CardContent className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No market prices found matching your search.</p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}