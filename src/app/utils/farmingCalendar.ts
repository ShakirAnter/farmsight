export interface CropCalendarEvent {
  cropName: string
  activity: 'planting' | 'fertilizing' | 'weeding' | 'pestControl' | 'harvesting'
  month: number // 1-12
  description: string
  season: 'Season A' | 'Season B' | 'Year-round'
}

// Uganda has two rainy seasons:
// Season A: March-May
// Season B: September-November
export const cropCalendarData: CropCalendarEvent[] = [
  // Maize
  { cropName: 'Maize', activity: 'planting', month: 3, description: 'Plant at start of Season A rains', season: 'Season A' },
  { cropName: 'Maize', activity: 'fertilizing', month: 4, description: 'Top dress with Urea 3-4 weeks after planting', season: 'Season A' },
  { cropName: 'Maize', activity: 'weeding', month: 4, description: 'First weeding 2-3 weeks after planting', season: 'Season A' },
  { cropName: 'Maize', activity: 'weeding', month: 5, description: 'Second weeding 5-6 weeks after planting', season: 'Season A' },
  { cropName: 'Maize', activity: 'harvesting', month: 7, description: 'Harvest when moisture is 13-14%', season: 'Season A' },
  
  { cropName: 'Maize', activity: 'planting', month: 9, description: 'Plant at start of Season B rains', season: 'Season B' },
  { cropName: 'Maize', activity: 'fertilizing', month: 10, description: 'Top dress with Urea 3-4 weeks after planting', season: 'Season B' },
  { cropName: 'Maize', activity: 'harvesting', month: 12, description: 'Harvest when moisture is 13-14%', season: 'Season B' },
  
  // Beans
  { cropName: 'Beans', activity: 'planting', month: 3, description: 'Plant early in Season A', season: 'Season A' },
  { cropName: 'Beans', activity: 'weeding', month: 4, description: 'Weed 2-3 weeks after planting', season: 'Season A' },
  { cropName: 'Beans', activity: 'harvesting', month: 6, description: 'Harvest when 90% of pods are dry', season: 'Season A' },
  
  { cropName: 'Beans', activity: 'planting', month: 9, description: 'Plant early in Season B', season: 'Season B' },
  { cropName: 'Beans', activity: 'harvesting', month: 12, description: 'Harvest when 90% of pods are dry', season: 'Season B' },
  
  // Coffee
  { cropName: 'Coffee', activity: 'planting', month: 3, description: 'Transplant seedlings at start of rains', season: 'Season A' },
  { cropName: 'Coffee', activity: 'fertilizing', month: 5, description: 'Apply NPK fertilizer', season: 'Year-round' },
  { cropName: 'Coffee', activity: 'weeding', month: 6, description: 'Regular weeding to reduce competition', season: 'Year-round' },
  { cropName: 'Coffee', activity: 'fertilizing', month: 10, description: 'Apply NPK fertilizer', season: 'Year-round' },
  { cropName: 'Coffee', activity: 'harvesting', month: 8, description: 'Pick only ripe red cherries', season: 'Year-round' },
  { cropName: 'Coffee', activity: 'harvesting', month: 11, description: 'Main harvest season', season: 'Year-round' },
  
  // Cassava
  { cropName: 'Cassava', activity: 'planting', month: 3, description: 'Plant at start of Season A rains', season: 'Season A' },
  { cropName: 'Cassava', activity: 'weeding', month: 5, description: 'First weeding 6-8 weeks after planting', season: 'Season A' },
  { cropName: 'Cassava', activity: 'weeding', month: 7, description: 'Second weeding 3-4 months after planting', season: 'Season A' },
  
  { cropName: 'Cassava', activity: 'planting', month: 9, description: 'Plant at start of Season B rains', season: 'Season B' },
  
  // Banana
  { cropName: 'Banana', activity: 'planting', month: 3, description: 'Plant suckers at start of rains', season: 'Season A' },
  { cropName: 'Banana', activity: 'weeding', month: 4, description: 'Regular weeding monthly', season: 'Year-round' },
  { cropName: 'Banana', activity: 'fertilizing', month: 5, description: 'Apply manure around mat', season: 'Year-round' },
  { cropName: 'Banana', activity: 'planting', month: 9, description: 'Plant suckers at start of rains', season: 'Season B' },
  
  // Sweet Potato
  { cropName: 'Sweet Potato', activity: 'planting', month: 3, description: 'Plant vines at start of Season A', season: 'Season A' },
  { cropName: 'Sweet Potato', activity: 'weeding', month: 4, description: 'Weed 3-4 weeks after planting', season: 'Season A' },
  { cropName: 'Sweet Potato', activity: 'harvesting', month: 7, description: 'Harvest 4-5 months after planting', season: 'Season A' },
  
  { cropName: 'Sweet Potato', activity: 'planting', month: 9, description: 'Plant vines at start of Season B', season: 'Season B' },
  { cropName: 'Sweet Potato', activity: 'harvesting', month: 1, description: 'Harvest 4-5 months after planting', season: 'Season B' },
  
  // Rice
  { cropName: 'Rice', activity: 'planting', month: 3, description: 'Transplant seedlings in Season A', season: 'Season A' },
  { cropName: 'Rice', activity: 'fertilizing', month: 4, description: 'Apply Urea 3 weeks after transplanting', season: 'Season A' },
  { cropName: 'Rice', activity: 'weeding', month: 5, description: 'Weed or apply herbicides', season: 'Season A' },
  { cropName: 'Rice', activity: 'harvesting', month: 7, description: 'Harvest when grains are mature', season: 'Season A' },
  
  { cropName: 'Rice', activity: 'planting', month: 9, description: 'Transplant seedlings in Season B', season: 'Season B' },
  { cropName: 'Rice', activity: 'harvesting', month: 1, description: 'Harvest when grains are mature', season: 'Season B' },
  
  // Groundnuts
  { cropName: 'Groundnuts', activity: 'planting', month: 3, description: 'Plant at start of Season A', season: 'Season A' },
  { cropName: 'Groundnuts', activity: 'weeding', month: 4, description: 'First weeding 3 weeks after planting', season: 'Season A' },
  { cropName: 'Groundnuts', activity: 'weeding', month: 5, description: 'Second weeding before flowering', season: 'Season A' },
  { cropName: 'Groundnuts', activity: 'harvesting', month: 7, description: 'Harvest when leaves turn yellow', season: 'Season A' },
  
  { cropName: 'Groundnuts', activity: 'planting', month: 9, description: 'Plant at start of Season B', season: 'Season B' },
  { cropName: 'Groundnuts', activity: 'harvesting', month: 12, description: 'Harvest when leaves turn yellow', season: 'Season B' },
  
  // Tomato
  { cropName: 'Tomato', activity: 'planting', month: 3, description: 'Transplant seedlings', season: 'Season A' },
  { cropName: 'Tomato', activity: 'fertilizing', month: 4, description: 'Apply NPK 2 weeks after transplanting', season: 'Season A' },
  { cropName: 'Tomato', activity: 'pestControl', month: 5, description: 'Spray for late blight prevention', season: 'Season A' },
  { cropName: 'Tomato', activity: 'harvesting', month: 6, description: 'Harvest ripe fruits regularly', season: 'Season A' },
  
  { cropName: 'Tomato', activity: 'planting', month: 9, description: 'Transplant seedlings', season: 'Season B' },
  { cropName: 'Tomato', activity: 'harvesting', month: 11, description: 'Harvest ripe fruits regularly', season: 'Season B' },
  
  // Irish Potato
  { cropName: 'Irish Potato', activity: 'planting', month: 3, description: 'Plant certified seed potatoes', season: 'Season A' },
  { cropName: 'Irish Potato', activity: 'fertilizing', month: 4, description: 'Apply NPK at planting', season: 'Season A' },
  { cropName: 'Irish Potato', activity: 'weeding', month: 5, description: 'Weed and earth up', season: 'Season A' },
  { cropName: 'Irish Potato', activity: 'harvesting', month: 7, description: 'Harvest when vines die back', season: 'Season A' },
  
  { cropName: 'Irish Potato', activity: 'planting', month: 9, description: 'Plant certified seed potatoes', season: 'Season B' },
  { cropName: 'Irish Potato', activity: 'harvesting', month: 12, description: 'Harvest when vines die back', season: 'Season B' },
  
  // Cabbage
  { cropName: 'Cabbage', activity: 'planting', month: 3, description: 'Transplant seedlings', season: 'Season A' },
  { cropName: 'Cabbage', activity: 'fertilizing', month: 4, description: 'Apply nitrogen fertilizer', season: 'Season A' },
  { cropName: 'Cabbage', activity: 'pestControl', month: 5, description: 'Control aphids and caterpillars', season: 'Season A' },
  { cropName: 'Cabbage', activity: 'harvesting', month: 6, description: 'Harvest when heads are firm', season: 'Season A' },
]

export function getActivitiesForMonth(month: number, cropFilter?: string): CropCalendarEvent[] {
  let activities = cropCalendarData.filter(event => event.month === month)
  
  if (cropFilter) {
    activities = activities.filter(event => 
      event.cropName.toLowerCase() === cropFilter.toLowerCase()
    )
  }
  
  return activities
}

export function getActivitiesForCrop(cropName: string): CropCalendarEvent[] {
  return cropCalendarData.filter(event => 
    event.cropName.toLowerCase() === cropName.toLowerCase()
  )
}

export function getCurrentMonthActivities(): CropCalendarEvent[] {
  const currentMonth = new Date().getMonth() + 1 // JavaScript months are 0-indexed
  return getActivitiesForMonth(currentMonth)
}

export function getUpcomingActivities(weeksAhead: number = 4): CropCalendarEvent[] {
  const today = new Date()
  const currentMonth = today.getMonth() + 1
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1
  
  const currentActivities = getActivitiesForMonth(currentMonth)
  const nextActivities = getActivitiesForMonth(nextMonth)
  
  return [...currentActivities, ...nextActivities]
}

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export const activityColors = {
  planting: '#10b981', // green
  fertilizing: '#f59e0b', // amber
  weeding: '#8b5cf6', // purple
  pestControl: '#ef4444', // red
  harvesting: '#3b82f6', // blue
}

export const activityIcons = {
  planting: '🌱',
  fertilizing: '🧪',
  weeding: '🌿',
  pestControl: '🐛',
  harvesting: '🌾',
}
