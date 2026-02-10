import { FarmingTip } from '../types'

export const farmingTipsData: FarmingTip[] = [
  {
    id: '1',
    title: 'Soil Testing and Preparation',
    category: 'soil-management',
    content: 'Test your soil pH and nutrient levels before planting. Ugandan soils often need lime to reduce acidity. Add organic matter like manure or compost to improve soil structure and fertility. Proper land preparation prevents waterlogging and promotes root development.',
    tags: ['soil', 'preparation', 'testing', 'fertility']
  },
  {
    id: '2',
    title: 'Optimal Planting Times in Uganda',
    category: 'general',
    content: 'Uganda has two rainy seasons: March-May and September-November. Plant annuals at the start of these seasons. For coffee and other perennials, plant at the beginning of the rainy season for best establishment.',
    cropSpecific: 'General',
    tags: ['planting', 'seasons', 'timing', 'rainfall']
  },
  {
    id: '3',
    title: 'Maize Pest Control',
    category: 'pest-control',
    content: 'Combat fall armyworm by planting early, using resistant varieties, and applying appropriate pesticides. Remove and destroy infected plants. Practice crop rotation with legumes to break pest cycles.',
    cropSpecific: 'Maize',
    tags: ['maize', 'pests', 'armyworm', 'control']
  },
  {
    id: '4',
    title: 'Coffee Disease Management',
    category: 'pest-control',
    content: 'Prevent coffee wilt disease by using certified disease-free seedlings. Remove and burn infected plants immediately. Practice good sanitation by cleaning tools between uses. Maintain proper spacing for air circulation.',
    cropSpecific: 'Coffee',
    tags: ['coffee', 'disease', 'wilt', 'prevention']
  },
  {
    id: '5',
    title: 'Water Management Techniques',
    category: 'irrigation',
    content: 'Use mulching to conserve soil moisture during dry spells. Dig trenches along contours to harvest rainwater. For irrigation, drip systems are most efficient. Water early morning or late evening to reduce evaporation.',
    tags: ['water', 'irrigation', 'conservation', 'mulching']
  },
  {
    id: '6',
    title: 'Bean Intercropping Benefits',
    category: 'general',
    content: 'Intercrop beans with maize to fix nitrogen in soil and maximize land use. Plant beans 2 weeks after maize. This combination reduces pest pressure and provides dietary diversity.',
    cropSpecific: 'Beans',
    tags: ['beans', 'intercropping', 'maize', 'nitrogen']
  },
  {
    id: '7',
    title: 'Proper Harvesting Techniques',
    category: 'harvesting',
    content: 'Harvest crops at the right maturity stage. For maize, wait until moisture content is 13-14%. Harvest in dry weather to prevent mold. Use sharp tools to avoid damaging plants and produce.',
    tags: ['harvesting', 'timing', 'quality', 'maturity']
  },
  {
    id: '8',
    title: 'Post-Harvest Handling',
    category: 'post-harvest',
    content: 'Dry grains properly before storage (12-13% moisture). Use hermetic storage bags to prevent pest damage. Store in cool, dry places. Regular inspection prevents losses from pests and mold.',
    tags: ['storage', 'drying', 'pests', 'quality']
  },
  {
    id: '9',
    title: 'Banana Mat Management',
    category: 'general',
    content: 'Maintain 3-5 stems per banana mat of different ages. Remove diseased leaves and stems. Mulch heavily around the mat. De-sucker regularly to maintain optimal plant population.',
    cropSpecific: 'Banana',
    tags: ['banana', 'management', 'desuckering', 'mulching']
  },
  {
    id: '10',
    title: 'Organic Fertilizer Preparation',
    category: 'soil-management',
    content: 'Make compost from farm waste, kitchen scraps, and manure. Turn the pile weekly for faster decomposition. Ready compost is dark, crumbly, and earthy-smelling. Apply 2-3 months before planting.',
    tags: ['compost', 'organic', 'fertilizer', 'nutrients']
  },
  {
    id: '11',
    title: 'Cassava Variety Selection',
    category: 'general',
    content: 'Choose improved varieties like NASE 14 and NASE 19 that resist diseases and have higher yields. Use disease-free planting materials. Plant at 1m x 1m spacing for optimal yields.',
    cropSpecific: 'Cassava',
    tags: ['cassava', 'varieties', 'selection', 'planting']
  },
  {
    id: '12',
    title: 'Pest Monitoring and Scouting',
    category: 'pest-control',
    content: 'Inspect your crops weekly for pests and diseases. Check undersides of leaves and stems. Early detection allows for timely intervention with less pesticide use. Keep records of pest occurrences.',
    tags: ['monitoring', 'scouting', 'early-detection', 'IPM']
  },
]

export function searchFarmingTips(query: string): FarmingTip[] {
  const lowerQuery = query.toLowerCase()
  return farmingTipsData.filter(tip =>
    tip.title.toLowerCase().includes(lowerQuery) ||
    tip.content.toLowerCase().includes(lowerQuery) ||
    tip.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    (tip.cropSpecific && tip.cropSpecific.toLowerCase().includes(lowerQuery))
  )
}

export function getTipsByCategory(category: FarmingTip['category']): FarmingTip[] {
  return farmingTipsData.filter(tip => tip.category === category)
}

export function getTipsByCrop(cropName: string): FarmingTip[] {
  return farmingTipsData.filter(tip => 
    tip.cropSpecific?.toLowerCase() === cropName.toLowerCase() ||
    tip.content.toLowerCase().includes(cropName.toLowerCase())
  )
}
