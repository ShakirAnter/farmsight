import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { GraduationCap, Search, Clock, CheckCircle2, Lightbulb } from 'lucide-react'
import { tutorialsData, searchTutorials, getTutorialsByCategory, Tutorial } from '../../utils/tutorials'

const categoryLabels: { [key in Tutorial['category']]: string } = {
  'getting-started': 'Getting Started',
  'planting': 'Planting',
  'maintenance': 'Maintenance',
  'harvesting': 'Harvesting',
  'marketing': 'Marketing'
}

export function Tutorials() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Tutorial['category'] | 'all'>('all')

  const filteredTutorials = searchQuery
    ? searchTutorials(searchQuery)
    : selectedCategory === 'all'
      ? tutorialsData
      : getTutorialsByCategory(selectedCategory)

  const categories: (Tutorial['category'] | 'all')[] = [
    'all',
    'getting-started',
    'planting',
    'maintenance',
    'harvesting',
    'marketing'
  ]

  const getCategoryCount = (category: Tutorial['category'] | 'all') => {
    if (category === 'all') return tutorialsData.length
    return getTutorialsByCategory(category).length
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="dark:text-white flex items-center gap-2">
          <GraduationCap className="h-6 w-6" />
          Step-by-Step Tutorials
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Detailed guides to improve your farming practices
        </p>
      </div>

      {/* Search */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tutorials by topic or crop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)} className="w-full">
        <TabsList className="w-full grid grid-cols-3 lg:grid-cols-6 dark:bg-gray-800">
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat} className="text-xs lg:text-sm">
              {cat === 'all' ? 'All' : categoryLabels[cat]} ({getCategoryCount(cat)})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Tutorials */}
      {filteredTutorials.length > 0 ? (
        <div className="space-y-4">
          {filteredTutorials.map((tutorial, index) => (
            <Card key={tutorial.id} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="capitalize">
                        {categoryLabels[tutorial.category]}
                      </Badge>
                      {tutorial.cropSpecific && (
                        <Badge variant="secondary">{tutorial.cropSpecific}</Badge>
                      )}
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        {tutorial.duration}
                      </div>
                    </div>
                    <CardTitle className="dark:text-white">{tutorial.title}</CardTitle>
                    <CardDescription className="dark:text-gray-400 mt-2">
                      {tutorial.description}
                    </CardDescription>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="steps">
                    <AccordionTrigger className="dark:text-white">
                      View {tutorial.steps.length} Steps
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6 mt-4">
                        {tutorial.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <span className="text-green-600 dark:text-green-400 font-semibold">
                                  {stepIndex + 1}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold dark:text-white mb-1">{step.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                {step.description}
                              </p>
                              {step.tips && step.tips.length > 0 && (
                                <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                                      Pro Tips:
                                    </span>
                                  </div>
                                  <ul className="space-y-1">
                                    {step.tips.map((tip, tipIndex) => (
                                      <li
                                        key={tipIndex}
                                        className="text-sm text-blue-800 dark:text-blue-300 flex items-start gap-2"
                                      >
                                        <CheckCircle2 className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                        <span>{tip}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-12 text-center">
            <GraduationCap className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No tutorials found matching your search. Try different keywords.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{tutorialsData.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Tutorials</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {tutorialsData.reduce((sum, t) => sum + t.steps.length, 0)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Steps</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">5</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {new Set(tutorialsData.map(t => t.cropSpecific).filter(Boolean)).size}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Crops Covered</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
