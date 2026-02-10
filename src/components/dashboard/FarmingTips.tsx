import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { BookOpen, Search, Leaf, Bug, Droplets, Wheat, Package } from 'lucide-react'
import { farmingTipsData, searchFarmingTips, getTipsByCategory } from '../../utils/farmingTips'
import { FarmingTip } from '../../types'

const categoryIcons: { [key: string]: any } = {
  'general': Leaf,
  'soil-management': Wheat,
  'pest-control': Bug,
  'irrigation': Droplets,
  'harvesting': Package,
  'post-harvest': Package
}

const categoryColors: { [key: string]: string } = {
  'general': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'soil-management': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  'pest-control': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  'irrigation': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  'harvesting': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  'post-harvest': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
}

export function FarmingTips() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<FarmingTip['category'] | 'all'>('all')

  const filteredTips = searchQuery 
    ? searchFarmingTips(searchQuery)
    : selectedCategory === 'all' 
      ? farmingTipsData 
      : getTipsByCategory(selectedCategory)

  const categories = [
    { value: 'all', label: 'All Tips', count: farmingTipsData.length },
    { value: 'general', label: 'General', count: getTipsByCategory('general').length },
    { value: 'soil-management', label: 'Soil Management', count: getTipsByCategory('soil-management').length },
    { value: 'pest-control', label: 'Pest Control', count: getTipsByCategory('pest-control').length },
    { value: 'irrigation', label: 'Irrigation', count: getTipsByCategory('irrigation').length },
    { value: 'harvesting', label: 'Harvesting', count: getTipsByCategory('harvesting').length },
    { value: 'post-harvest', label: 'Post-Harvest', count: getTipsByCategory('post-harvest').length },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="dark:text-white flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Farming Tips Library
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Best practices and expert advice for Ugandan farmers
        </p>
      </div>

      {/* Search */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tips by keyword, crop, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)} className="w-full">
        <TabsList className="w-full grid grid-cols-3 lg:grid-cols-7 dark:bg-gray-800">
          {categories.map(cat => (
            <TabsTrigger key={cat.value} value={cat.value} className="text-xs lg:text-sm">
              {cat.label} ({cat.count})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTips.length > 0 ? (
          filteredTips.map(tip => {
            const Icon = categoryIcons[tip.category] || BookOpen
            return (
              <Card key={tip.id} className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${categoryColors[tip.category] || 'bg-gray-100'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="dark:text-white text-base">{tip.title}</CardTitle>
                        {tip.cropSpecific && (
                          <Badge variant="outline" className="mt-2">
                            {tip.cropSpecific}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {tip.content}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {tip.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <Card className="col-span-full dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No tips found matching your search. Try different keywords.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{farmingTipsData.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Tips</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {new Set(farmingTipsData.map(t => t.cropSpecific).filter(Boolean)).size}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Crops Covered</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">6</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {new Set(farmingTipsData.flatMap(t => t.tags)).size}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Topics</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
