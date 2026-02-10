import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { compareCrops, cropComparisonDatabase, CropComparisonData } from '../../utils/cropComparison'
import { Check, X } from 'lucide-react'

export function CropComparison() {
  const [selectedCrops, setSelectedCrops] = useState<string[]>(['Maize', 'Beans'])
  const [comparisonData, setComparisonData] = useState<CropComparisonData[]>(compareCrops(['Maize', 'Beans']))

  const availableCrops = cropComparisonDatabase.map(c => c.cropName)

  const handleCropSelection = (index: number, cropName: string) => {
    const newSelection = [...selectedCrops]
    newSelection[index] = cropName
    setSelectedCrops(newSelection)
    setComparisonData(compareCrops(newSelection))
  }

  const addCropToCompare = () => {
    if (selectedCrops.length < 4) {
      const availableToAdd = availableCrops.find(c => !selectedCrops.includes(c))
      if (availableToAdd) {
        const newSelection = [...selectedCrops, availableToAdd]
        setSelectedCrops(newSelection)
        setComparisonData(compareCrops(newSelection))
      }
    }
  }

  const removeCrop = (index: number) => {
    if (selectedCrops.length > 2) {
      const newSelection = selectedCrops.filter((_, i) => i !== index)
      setSelectedCrops(newSelection)
      setComparisonData(compareCrops(newSelection))
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 dark:from-green-900/50 dark:to-emerald-900/50 dark:text-green-300 border border-green-300 dark:border-green-700'
      case 'Medium': return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 dark:from-yellow-900/50 dark:to-amber-900/50 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700'
      case 'Low': return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 dark:from-red-900/50 dark:to-rose-900/50 dark:text-red-300 border border-red-300 dark:border-red-700'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="dark:text-white text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 dark:from-blue-400 dark:to-sky-400 bg-clip-text text-transparent">Crop Comparison Tool</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Compare different crops to make informed planting decisions
        </p>
      </div>

      {/* Crop Selection */}
      <Card className="dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 bg-white dark:border-blue-600 border-2 border-blue-200 shadow-xl">
        <CardHeader className="bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-900/40 dark:to-sky-900/40 border-b-2 border-blue-200 dark:border-blue-700">
          <CardTitle className="dark:text-white font-bold text-xl">Select Crops to Compare</CardTitle>
          <CardDescription className="dark:text-gray-300 text-gray-700 font-medium">
            Choose 2-4 crops for side-by-side comparison
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            {selectedCrops.map((crop, index) => (
              <div key={index} className="flex items-center gap-2">
                <Select value={crop} onValueChange={(v) => handleCropSelection(index, v)}>
                  <SelectTrigger className="w-40 dark:bg-gray-700 dark:text-white border-2 border-blue-200 dark:border-blue-600 h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCrops.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedCrops.length > 2 && (
                  <Button variant="outline" size="sm" onClick={() => removeCrop(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {selectedCrops.length < 4 && (
              <Button onClick={addCropToCompare} variant="outline">
                + Add Crop
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <div className="grid grid-cols-1 gap-6">
        {/* Basic Info Comparison */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-3 px-4 dark:text-gray-300">Attribute</th>
                    {comparisonData.map(crop => (
                      <th key={crop.cropName} className="text-left py-3 px-4 dark:text-white">{crop.cropName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Growing Period</td>
                    {comparisonData.map(crop => (
                      <td key={crop.cropName} className="py-3 px-4 dark:text-gray-200">{crop.growingPeriod}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Average Yield/Acre</td>
                    {comparisonData.map(crop => (
                      <td key={crop.cropName} className="py-3 px-4 dark:text-gray-200">{crop.averageYieldPerAcre}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Typical Price (UGX/kg)</td>
                    {comparisonData.map(crop => (
                      <td key={crop.cropName} className="py-3 px-4 dark:text-gray-200">{crop.typicalSellingPrice.toLocaleString()}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Requirements Comparison */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Requirements & Characteristics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-3 px-4 dark:text-gray-300">Attribute</th>
                    {comparisonData.map(crop => (
                      <th key={crop.cropName} className="text-left py-3 px-4 dark:text-white">{crop.cropName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Water Requirement</td>
                    {comparisonData.map(crop => (
                      <td key={crop.cropName} className="py-3 px-4">
                        <Badge className={getLevelColor(crop.waterRequirement)}>{crop.waterRequirement}</Badge>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Labor Requirement</td>
                    {comparisonData.map(crop => (
                      <td key={crop.cropName} className="py-3 px-4">
                        <Badge className={getLevelColor(crop.laborRequirement)}>{crop.laborRequirement}</Badge>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Market Demand</td>
                    {comparisonData.map(crop => (
                      <td key={crop.cropName} className="py-3 px-4">
                        <Badge className={getLevelColor(crop.marketDemand)}>{crop.marketDemand}</Badge>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Profitability</td>
                    {comparisonData.map(crop => (
                      <td key={crop.cropName} className="py-3 px-4">
                        <Badge className={getLevelColor(crop.profitability)}>{crop.profitability}</Badge>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparisonData.map(crop => (
            <Card key={crop.cropName} className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">{crop.cropName}</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Suitable for: {crop.suitableRegions.join(', ')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm text-green-600 dark:text-green-400 mb-2">✓ Advantages</h4>
                  <ul className="space-y-1">
                    {crop.advantages.map((adv, i) => (
                      <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm text-red-600 dark:text-red-400 mb-2">⚠ Challenges</h4>
                  <ul className="space-y-1">
                    {crop.mainChallenges.map((challenge, i) => (
                      <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                        <X className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}