import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Badge } from '../ui/badge'
import { Calendar } from '../ui/calendar'
import { 
  monthNames, 
  getActivitiesForMonth, 
  activityColors, 
  activityIcons,
  CropCalendarEvent
} from '../../utils/farmingCalendar'

export function FarmingCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedCrop, setSelectedCrop] = useState('all')
  const [date, setDate] = useState<Date | undefined>(new Date())

  const activities = getActivitiesForMonth(selectedMonth, selectedCrop === 'all' ? undefined : selectedCrop)

  const crops = ['Maize', 'Beans', 'Coffee', 'Cassava', 'Banana', 'Sweet Potato', 'Rice', 'Groundnuts', 'Tomato', 'Irish Potato', 'Cabbage']

  const groupedActivities: { [key: string]: CropCalendarEvent[] } = {}
  activities.forEach(activity => {
    if (!groupedActivities[activity.cropName]) {
      groupedActivities[activity.cropName] = []
    }
    groupedActivities[activity.cropName].push(activity)
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="dark:text-white text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 dark:from-purple-400 dark:to-violet-400 bg-clip-text text-transparent">Farming Calendar</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Plan your farming activities based on Uganda's growing seasons
        </p>
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 dark:from-purple-900/30 dark:via-violet-900/30 dark:to-fuchsia-900/30 border-2 border-purple-300 dark:border-purple-700 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🌦️</span>
            <div>
              <p className="dark:text-white mb-2 font-bold text-lg"><strong>Uganda's Rainy Seasons:</strong></p>
              <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                <strong className="text-green-600 dark:text-green-400 text-base">Season A:</strong> March - May | <strong className="text-teal-600 dark:text-teal-400 text-base">Season B:</strong> September - November
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Plan your planting and harvesting activities around these seasons for best results.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 bg-white dark:border-purple-600 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40 border-b-2 border-purple-200 dark:border-purple-700">
            <CardTitle className="dark:text-white text-base font-bold">Select Month</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
              <SelectTrigger className="dark:bg-gray-700 dark:text-white border-2 border-purple-200 dark:border-purple-600 h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {monthNames.map((month, index) => (
                  <SelectItem key={index} value={(index + 1).toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 bg-white dark:border-purple-600 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40 border-b-2 border-purple-200 dark:border-purple-700">
            <CardTitle className="dark:text-white text-base font-bold">Filter by Crop</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="dark:bg-gray-700 dark:text-white border-2 border-purple-200 dark:border-purple-600 h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                {crops.map(crop => (
                  <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Calendar View */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">
            {monthNames[selectedMonth - 1]} Activities
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            {activities.length} farming activities scheduled
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No activities scheduled for this month and crop selection
            </p>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedActivities).map(([cropName, cropActivities]) => (
                <div key={cropName} className="border-l-4 border-green-500 pl-4">
                  <h4 className="dark:text-white mb-3">{cropName}</h4>
                  <div className="space-y-3">
                    {cropActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                      >
                        <span className="text-2xl">{activityIcons[activity.activity]}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              style={{ backgroundColor: activityColors[activity.activity] }}
                              className="text-white capitalize"
                            >
                              {activity.activity}
                            </Badge>
                            <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                              {activity.season}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activity Legend */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Activity Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(activityIcons).map(([activity, icon]) => (
              <div key={activity} className="flex items-center gap-2">
                <span className="text-xl">{icon}</span>
                <div>
                  <Badge
                    style={{ backgroundColor: activityColors[activity as keyof typeof activityColors] }}
                    className="text-white capitalize text-xs"
                  >
                    {activity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}