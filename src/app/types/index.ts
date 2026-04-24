export interface CropData {
  cropName: string
  landSize: number
  landUnit: 'acres' | 'hectares'
  expectedYield: number
  yieldUnit: 'kg' | 'tonnes'
  costOfProduction: number
  sellingPrice: number
  season: string
  location: string
}

export interface Report {
  crops: CropData[]
  totalLandSize: number
  totalCost: number
  totalRevenue: number
  totalProfit: number
  recommendations: string[]
  createdAt: string
}

export interface User {
  id: string
  email: string
  username: string
}

export interface Expense {
  id: string
  userId: string
  category: 'seeds' | 'fertilizer' | 'pesticides' | 'labor' | 'equipment' | 'irrigation' | 'transport' | 'other'
  description: string
  amount: number
  date: string
  cropRelated?: string
}

export interface FarmingTip {
  id: string
  title: string
  category: 'general' | 'soil-management' | 'pest-control' | 'irrigation' | 'harvesting' | 'post-harvest'
  content: string
  cropSpecific?: string
  tags: string[]
}

export interface DiseaseGuide {
  id: string
  name: string
  cropAffected: string[]
  symptoms: string[]
  treatment: string[]
  prevention: string[]
}

export interface CropComparisonData {
  cropName: string
  growingTime: number
  waterNeeds: 'Low' | 'Medium' | 'High'
  profitability: 'Low' | 'Medium' | 'High'
  difficulty: 'Easy' | 'Medium' | 'Hard'
  bestSeason: string
  averageYield: string
  marketDemand: 'Low' | 'Medium' | 'High'
}

export interface MarketPrice {
  crop: string
  cropName?: string
  price: number
  pricePerKg?: number
  market: string
  district: string
  lastUpdated: string
  trend: 'up' | 'down' | 'stable'
}