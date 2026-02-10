import { MarketPrice } from '../types'

// Mock market prices data - In production, this would come from an API
export const marketPricesData: MarketPrice[] = [
  {
    crop: 'Maize',
    cropName: 'Maize',
    price: 1800,
    pricePerKg: 1800,
    market: 'Nakasero Market',
    district: 'Kampala',
    lastUpdated: new Date().toISOString(),
    trend: 'up'
  },
  {
    crop: 'Maize',
    cropName: 'Maize',
    price: 1700,
    pricePerKg: 1700,
    market: 'Owino Market',
    district: 'Kampala',
    lastUpdated: new Date().toISOString(),
    trend: 'stable'
  },
  {
    crop: 'Beans',
    cropName: 'Beans',
    price: 3500,
    pricePerKg: 3500,
    market: 'Nakasero Market',
    district: 'Kampala',
    lastUpdated: new Date().toISOString(),
    trend: 'up'
  },
  {
    crop: 'Beans',
    cropName: 'Beans',
    price: 3300,
    pricePerKg: 3300,
    market: 'Owino Market',
    district: 'Kampala',
    lastUpdated: new Date().toISOString(),
    trend: 'stable'
  },
  {
    crop: 'Coffee',
    cropName: 'Coffee',
    price: 8500,
    pricePerKg: 8500,
    market: 'Nakasero Market',
    district: 'Kampala',
    lastUpdated: new Date().toISOString(),
    trend: 'up'
  },
  {
    crop: 'Cassava',
    cropName: 'Cassava',
    price: 800,
    pricePerKg: 800,
    market: 'Nakasero Market',
    district: 'Kampala',
    lastUpdated: new Date().toISOString(),
    trend: 'down'
  },
  {
    crop: 'Sweet Potatoes',
    cropName: 'Sweet Potatoes',
    price: 1200,
    pricePerKg: 1200,
    market: 'Nakasero Market',
    district: 'Kampala',
    lastUpdated: new Date().toISOString(),
    trend: 'stable'
  },
  {
    crop: 'Matooke (Cooking Bananas)',
    cropName: 'Matooke (Cooking Bananas)',
    price: 1500,
    pricePerKg: 1500,
    market: 'Nakasero Market',
    district: 'Kampala',
    lastUpdated: new Date().toISOString(),
    trend: 'up'
  },
  {
    crop: 'Groundnuts (Peanuts)',
    cropName: 'Groundnuts (Peanuts)',
    price: 4000,
    pricePerKg: 4000,
    market: 'Nakasero Market',
    district: 'Kampala',
    lastUpdated: new Date().toISOString(),
    trend: 'up'
  },
  {
    crop: 'Rice',
    cropName: 'Rice',
    price: 3800,
    pricePerKg: 3800,
    market: 'Nakasero Market',
    district: 'Kampala',
    lastUpdated: new Date().toISOString(),
    trend: 'stable'
  },
  {
    crop: 'Tomatoes',
    cropName: 'Tomatoes',
    price: 2500,
    pricePerKg: 2500,
    market: 'Nakasero Market',
    district: 'Kampala',
    lastUpdated: new Date().toISOString(),
    trend: 'down'
  },
  {
    crop: 'Cabbage',
    cropName: 'Cabbage',
    price: 1800,
    pricePerKg: 1800,
    market: 'Nakasero Market',
    district: 'Kampala',
    lastUpdated: new Date().toISOString(),
    trend: 'stable'
  },
  {
    crop: 'Irish Potatoes',
    cropName: 'Irish Potatoes',
    price: 2200,
    pricePerKg: 2200,
    market: 'Nakasero Market',
    district: 'Kampala',
    lastUpdated: new Date().toISOString(),
    trend: 'up'
  },
]

export function getCurrentMarketPrices(): MarketPrice[] {
  return marketPricesData
}

export function getMarketPriceForCrop(cropName: string): MarketPrice[] {
  return marketPricesData.filter(price => 
    price.cropName.toLowerCase() === cropName.toLowerCase()
  )
}

export function getAveragePriceForCrop(cropName: string): number {
  const prices = getMarketPriceForCrop(cropName)
  if (prices.length === 0) return 0
  
  const sum = prices.reduce((acc, price) => acc + price.pricePerKg, 0)
  return Math.round(sum / prices.length)
}