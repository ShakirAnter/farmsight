export interface CropComparisonData {
  cropName: string
  growingPeriod: string // in days or months
  waterRequirement: 'Low' | 'Medium' | 'High'
  laborRequirement: 'Low' | 'Medium' | 'High'
  marketDemand: 'Low' | 'Medium' | 'High'
  profitability: 'Low' | 'Medium' | 'High'
  suitableRegions: string[]
  averageYieldPerAcre: string
  typicalSellingPrice: number // UGX per kg
  mainChallenges: string[]
  advantages: string[]
}

export const cropComparisonDatabase: CropComparisonData[] = [
  {
    cropName: 'Maize',
    growingPeriod: '90-120 days',
    waterRequirement: 'Medium',
    laborRequirement: 'Medium',
    marketDemand: 'High',
    profitability: 'Medium',
    suitableRegions: ['All regions of Uganda'],
    averageYieldPerAcre: '1,000-2,000 kg',
    typicalSellingPrice: 1800,
    mainChallenges: [
      'Fall armyworm infestation',
      'Maize streak virus',
      'Storage pests (weevils)',
      'Price fluctuations'
    ],
    advantages: [
      'High market demand',
      'Can be intercropped with beans',
      'Multiple varieties available',
      'Good food and cash crop'
    ]
  },
  {
    cropName: 'Beans',
    growingPeriod: '60-90 days',
    waterRequirement: 'Medium',
    laborRequirement: 'Medium',
    marketDemand: 'High',
    profitability: 'High',
    suitableRegions: ['Central', 'Eastern', 'Western regions'],
    averageYieldPerAcre: '400-800 kg',
    typicalSellingPrice: 3500,
    mainChallenges: [
      'Root rot in waterlogged soils',
      'Bean fly damage',
      'Storage weevils',
      'Need for certified seeds'
    ],
    advantages: [
      'Short growing period',
      'Fixes nitrogen in soil',
      'Good protein source',
      'High market value'
    ]
  },
  {
    cropName: 'Coffee',
    growingPeriod: '18-24 months to first harvest',
    waterRequirement: 'Medium',
    laborRequirement: 'High',
    marketDemand: 'High',
    profitability: 'High',
    suitableRegions: ['Central', 'Eastern', 'Western highlands'],
    averageYieldPerAcre: '500-1,000 kg (dry)',
    typicalSellingPrice: 8500,
    mainChallenges: [
      'Coffee wilt disease',
      'Long maturity period',
      'Labor-intensive',
      'Price volatility'
    ],
    advantages: [
      'High value export crop',
      'Perennial income source',
      'Good international market',
      'Can be grown in highlands'
    ]
  },
  {
    cropName: 'Cassava',
    growingPeriod: '9-12 months',
    waterRequirement: 'Low',
    laborRequirement: 'Low',
    marketDemand: 'High',
    profitability: 'Medium',
    suitableRegions: ['All regions of Uganda'],
    averageYieldPerAcre: '8,000-12,000 kg',
    typicalSellingPrice: 800,
    mainChallenges: [
      'Cassava mosaic disease',
      'Long growing period',
      'Low price per kg',
      'Bulky to transport'
    ],
    advantages: [
      'Drought tolerant',
      'Low labor requirement',
      'Food security crop',
      'Can be left in ground as storage'
    ]
  },
  {
    cropName: 'Banana',
    growingPeriod: '12-15 months to first harvest',
    waterRequirement: 'High',
    laborRequirement: 'High',
    marketDemand: 'High',
    profitability: 'Medium',
    suitableRegions: ['Central', 'Western', 'Eastern regions'],
    averageYieldPerAcre: '8,000-15,000 kg/year',
    typicalSellingPrice: 1500,
    mainChallenges: [
      'Banana bacterial wilt',
      'High water requirement',
      'Labor-intensive',
      'Nematode damage'
    ],
    advantages: [
      'Year-round production',
      'Staple food crop',
      'Good market demand',
      'Multiple harvests per year'
    ]
  },
  {
    cropName: 'Sweet Potato',
    growingPeriod: '3-5 months',
    waterRequirement: 'Medium',
    laborRequirement: 'Medium',
    marketDemand: 'High',
    profitability: 'Medium',
    suitableRegions: ['All regions of Uganda'],
    averageYieldPerAcre: '3,000-6,000 kg',
    typicalSellingPrice: 1200,
    mainChallenges: [
      'Sweet potato weevil',
      'Viral diseases',
      'Short shelf life',
      'Need for quality vines'
    ],
    advantages: [
      'Short growing period',
      'Drought tolerant',
      'Nutritious (Vitamin A)',
      'Multiple uses (fresh, processed)'
    ]
  },
  {
    cropName: 'Groundnuts',
    growingPeriod: '90-120 days',
    waterRequirement: 'Low',
    laborRequirement: 'Medium',
    marketDemand: 'High',
    profitability: 'High',
    suitableRegions: ['Northern', 'Eastern regions'],
    averageYieldPerAcre: '600-1,200 kg',
    typicalSellingPrice: 4000,
    mainChallenges: [
      'Rosette disease',
      'Aflatoxin contamination',
      'Poor market prices during harvest',
      'Need for proper drying'
    ],
    advantages: [
      'Drought tolerant',
      'Fixes nitrogen in soil',
      'High market value',
      'Good rotation crop'
    ]
  },
  {
    cropName: 'Rice',
    growingPeriod: '3-6 months',
    waterRequirement: 'High',
    laborRequirement: 'High',
    marketDemand: 'High',
    profitability: 'High',
    suitableRegions: ['Eastern', 'Northern wetlands'],
    averageYieldPerAcre: '1,500-3,000 kg',
    typicalSellingPrice: 3800,
    mainChallenges: [
      'High water requirement',
      'Labor-intensive',
      'Birds damage',
      'Need for wetlands'
    ],
    advantages: [
      'High demand (import substitution)',
      'Good profitability',
      'Expanding market',
      'Government support available'
    ]
  },
  {
    cropName: 'Tomato',
    growingPeriod: '3-4 months',
    waterRequirement: 'High',
    laborRequirement: 'High',
    marketDemand: 'High',
    profitability: 'High',
    suitableRegions: ['All regions with irrigation'],
    averageYieldPerAcre: '8,000-15,000 kg',
    typicalSellingPrice: 2500,
    mainChallenges: [
      'Late blight disease',
      'High input costs',
      'Requires staking',
      'Price fluctuations'
    ],
    advantages: [
      'High market demand',
      'Good profitability',
      'Short growing period',
      'Year-round production possible'
    ]
  },
  {
    cropName: 'Irish Potato',
    growingPeriod: '3-4 months',
    waterRequirement: 'Medium',
    laborRequirement: 'High',
    marketDemand: 'High',
    profitability: 'High',
    suitableRegions: ['Southwestern highlands', 'Mt. Elgon'],
    averageYieldPerAcre: '4,000-8,000 kg',
    typicalSellingPrice: 2200,
    mainChallenges: [
      'Late blight disease',
      'High cost of certified seeds',
      'Limited to highland areas',
      'Storage challenges'
    ],
    advantages: [
      'High profitability',
      'Growing urban demand',
      'Short growing period',
      'Good market prices'
    ]
  },
  {
    cropName: 'Cabbage',
    growingPeriod: '2-3 months',
    waterRequirement: 'High',
    laborRequirement: 'High',
    marketDemand: 'High',
    profitability: 'High',
    suitableRegions: ['Highland areas', 'Areas with irrigation'],
    averageYieldPerAcre: '15,000-25,000 kg',
    typicalSellingPrice: 1800,
    mainChallenges: [
      'Pest damage (aphids, caterpillars)',
      'Requires regular watering',
      'Price fluctuations',
      'Post-harvest losses'
    ],
    advantages: [
      'High yields',
      'Short growing period',
      'High urban demand',
      'Good profitability'
    ]
  }
]

export function compareCrops(cropNames: string[]): CropComparisonData[] {
  return cropComparisonDatabase.filter(crop =>
    cropNames.some(name => name.toLowerCase() === crop.cropName.toLowerCase())
  )
}

export function getCropData(cropName: string): CropComparisonData | undefined {
  return cropComparisonDatabase.find(crop =>
    crop.cropName.toLowerCase() === cropName.toLowerCase()
  )
}

export function rankCropsByProfitability(): CropComparisonData[] {
  const profitabilityScore = { 'High': 3, 'Medium': 2, 'Low': 1 }
  return [...cropComparisonDatabase].sort((a, b) => 
    profitabilityScore[b.profitability] - profitabilityScore[a.profitability]
  )
}

export function filterCropsByWaterRequirement(requirement: 'Low' | 'Medium' | 'High'): CropComparisonData[] {
  return cropComparisonDatabase.filter(crop => crop.waterRequirement === requirement)
}

export function filterCropsByRegion(region: string): CropComparisonData[] {
  return cropComparisonDatabase.filter(crop =>
    crop.suitableRegions.some(r => r.toLowerCase().includes(region.toLowerCase()))
  )
}
