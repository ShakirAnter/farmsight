import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Badge } from '../ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Bug, Search, AlertTriangle, Shield, Pill } from 'lucide-react'
import { diseaseGuidesData, searchDiseaseGuides, getGuidesByCrop } from '../../utils/diseaseGuide'
import { ugandanCrops } from '../../utils/ugandanCrops'

export function DiseaseGuide() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCrop, setSelectedCrop] = useState('all')

  const filteredGuides = searchQuery
    ? searchDiseaseGuides(searchQuery)
    : selectedCrop === 'all'
      ? diseaseGuidesData
      : getGuidesByCrop(selectedCrop)

  // Get unique crops that have disease guides
  const cropsWithGuides = Array.from(
    new Set(diseaseGuidesData.flatMap(guide => guide.cropAffected))
  ).sort()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="dark:text-white flex items-center gap-2">
          <Bug className="h-6 w-6" />
          Disease & Pest Identifier Guide
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Identify and treat common crop diseases and pests in Uganda
        </p>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by disease, symptom, or crop..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4">
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="dark:bg-gray-700 dark:text-white">
                <SelectValue placeholder="Filter by crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                {cropsWithGuides.map(crop => (
                  <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredGuides.length} disease{filteredGuides.length !== 1 ? 's' : ''} and pest{filteredGuides.length !== 1 ? 's' : ''}
      </div>

      {/* Disease Cards */}
      {filteredGuides.length > 0 ? (
        <div className="space-y-4">
          {filteredGuides.map(guide => (
            <Card key={guide.id} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="dark:text-white flex items-center gap-2">
                      <Bug className="h-5 w-5 text-red-600 dark:text-red-400" />
                      {guide.name}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {guide.cropAffected.map(crop => (
                        <Badge key={crop} variant="outline">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {/* Symptoms */}
                  <AccordionItem value="symptoms">
                    <AccordionTrigger className="dark:text-white">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        Symptoms
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 mt-2">
                        {guide.symptoms.map((symptom, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="text-yellow-600 mt-1">•</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Treatment */}
                  <AccordionItem value="treatment">
                    <AccordionTrigger className="dark:text-white">
                      <div className="flex items-center gap-2">
                        <Pill className="h-4 w-4 text-blue-600" />
                        Treatment
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 mt-2">
                        {guide.treatment.map((treatment, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Prevention */}
                  <AccordionItem value="prevention">
                    <AccordionTrigger className="dark:text-white">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        Prevention
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 mt-2">
                        {guide.prevention.map((prevention, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="text-green-600 mt-1">•</span>
                            <span>{prevention}</span>
                          </li>
                        ))}
                      </ul>
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
            <Bug className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No diseases or pests found matching your search. Try different keywords.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{diseaseGuidesData.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Diseases/Pests</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{cropsWithGuides.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Crops Covered</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {diseaseGuidesData.reduce((sum, g) => sum + g.symptoms.length, 0)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Symptoms</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {diseaseGuidesData.reduce((sum, g) => sum + g.prevention.length, 0)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Prevention Tips</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
