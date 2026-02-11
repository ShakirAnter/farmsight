import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Plus } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { 
  monthNames, 
  getActivitiesForMonth, 
  activityColors, 
  activityIcons,
  CropCalendarEvent
} from '../../utils/farmingCalendar'

interface ScheduledActivity {
  id: string
  cropName: string
  activity: string
  date: Date
  description: string
  notes: string
}

const STORAGE_KEY = 'farmsight_scheduled_activities'

// Helper function to check if a date is valid
const isValidDate = (date: any): boolean => {
  return date instanceof Date && !isNaN(date.getTime())
}

export function FarmingCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedCrop, setSelectedCrop] = useState('all')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [scheduledActivities, setScheduledActivities] = useState<ScheduledActivity[]>([])
  
  // Form states
  const [formCrop, setFormCrop] = useState('')
  const [formActivity, setFormActivity] = useState('')
  const [formDate, setFormDate] = useState<Date | undefined>(new Date())
  const [formDescription, setFormDescription] = useState('')
  const [formNotes, setFormNotes] = useState('')

  // Load activities from localStorage on mount and clean up expired ones
  useEffect(() => {
    const loadActivities = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          // Convert date strings back to Date objects
          const activities: ScheduledActivity[] = parsed.map((activity: any) => ({
            ...activity,
            date: new Date(activity.date)
          }))
          
          // Filter out activities whose dates have passed
          const today = new Date()
          today.setHours(0, 0, 0, 0) // Set to start of day for accurate comparison
          
          const validActivities = activities.filter(activity => {
            const activityDate = new Date(activity.date)
            activityDate.setHours(0, 0, 0, 0)
            return activityDate >= today
          })
          
          // Update state with valid activities
          setScheduledActivities(validActivities)
          
          // If some activities were removed, update localStorage
          if (validActivities.length !== activities.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validActivities))
          }
        }
      } catch (error) {
        console.error('Error loading activities:', error)
        toast.error('Failed to load saved activities')
      }
    }
    
    loadActivities()
  }, [])

  // Save activities to localStorage whenever they change
  useEffect(() => {
    if (scheduledActivities.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(scheduledActivities))
      } catch (error) {
        console.error('Error saving activities:', error)
        toast.error('Failed to save activities')
      }
    }
  }, [scheduledActivities])

  const activities = getActivitiesForMonth(selectedMonth, selectedCrop === 'all' ? undefined : selectedCrop)

  const crops = ['Maize', 'Beans', 'Coffee', 'Cassava', 'Banana', 'Sweet Potato', 'Rice', 'Groundnuts', 'Tomato', 'Irish Potato', 'Cabbage']

  // Filter scheduled activities by selected month and crop
  const filteredScheduledActivities = scheduledActivities.filter(activity => {
    const activityMonth = activity.date.getMonth() + 1
    const matchesMonth = activityMonth === selectedMonth
    const matchesCrop = selectedCrop === 'all' || activity.cropName === selectedCrop
    return matchesMonth && matchesCrop
  })

  // Convert scheduled activities to CropCalendarEvent format
  const scheduledAsCalendarEvents: CropCalendarEvent[] = filteredScheduledActivities.map(activity => ({
    cropName: activity.cropName,
    activity: activity.activity as any,
    month: selectedMonth,
    season: activity.date.getMonth() >= 2 && activity.date.getMonth() <= 4 ? 'Season A' : 
            activity.date.getMonth() >= 8 && activity.date.getMonth() <= 10 ? 'Season B' : 'Off-season',
    description: activity.description,
    isCustom: true,
    customNotes: activity.notes
  }))

  // Combine pre-defined activities with user-scheduled activities
  const allActivities = [...activities, ...scheduledAsCalendarEvents]

  const groupedActivities: { [key: string]: CropCalendarEvent[] } = {}
  allActivities.forEach(activity => {
    if (!groupedActivities[activity.cropName]) {
      groupedActivities[activity.cropName] = []
    }
    groupedActivities[activity.cropName].push(activity)
  })

  const handleAddActivity = () => {
    if (!formCrop || !formActivity || !formDate || !formDescription) {
      toast.error('Please fill in all required fields')
      return
    }

    const newActivity: ScheduledActivity = {
      id: Math.random().toString(36).substr(2, 9),
      cropName: formCrop,
      activity: formActivity,
      date: formDate,
      description: formDescription,
      notes: formNotes
    }

    setScheduledActivities([...scheduledActivities, newActivity])
    setIsDialogOpen(false)
    toast.success('Activity added successfully')
  }

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

      {/* Add Activity Button */}
      <Button
        className="dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white bg-violet-500 hover:bg-violet-600 text-white"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus className="mr-2" />
        Add Activity
      </Button>

      {/* Add Activity Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Farming Activity</DialogTitle>
            <DialogDescription>
              Add a new farming activity to your calendar. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="crop">Crop *</Label>
              <Select value={formCrop} onValueChange={setFormCrop}>
                <SelectTrigger className="dark:bg-gray-700 dark:text-white border-2 border-purple-200 dark:border-purple-600">
                  <SelectValue placeholder="Select a crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity">Activity Type *</Label>
              <Select value={formActivity} onValueChange={setFormActivity}>
                <SelectTrigger className="dark:bg-gray-700 dark:text-white border-2 border-purple-200 dark:border-purple-600">
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(activityIcons).map(([activity, icon]) => (
                    <SelectItem key={activity} value={activity}>
                      <span className="flex items-center gap-2">
                        <span>{icon}</span>
                        <span className="capitalize">{activity}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Scheduled Date *</Label>
              <Input
                id="date"
                type="date"
                value={formDate && isValidDate(formDate) ? formDate.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const newDate = new Date(e.target.value)
                  if (isValidDate(newDate)) {
                    setFormDate(newDate)
                  }
                }}
                className="dark:bg-gray-700 dark:text-white border-2 border-purple-200 dark:border-purple-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the farming activity..."
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="dark:bg-gray-700 dark:text-white border-2 border-purple-200 dark:border-purple-600 min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes or reminders..."
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                className="dark:bg-gray-700 dark:text-white border-2 border-purple-200 dark:border-purple-600 min-h-[60px]"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleAddActivity}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Calendar View */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">
            {monthNames[selectedMonth - 1]} Activities
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            {allActivities.length} farming activities scheduled
          </CardDescription>
        </CardHeader>
        <CardContent>
          {allActivities.length === 0 ? (
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