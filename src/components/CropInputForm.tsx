import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { CropData } from '../types'
import { UGANDAN_CROPS } from '../utils/ugandanCrops'
import { Plus, Trash2 } from 'lucide-react'

interface CropInputFormProps {
  onGenerateReport: (crops: CropData[]) => void
}

const UGANDAN_SEASONS = [
  'First Rainy Season (March-May)',
  'First Dry Season (June-August)',
  'Second Rainy Season (September-November)',
  'Second Dry Season (December-February)',
  'Custom'
]

export function CropInputForm({ onGenerateReport }: CropInputFormProps) {
  const [crops, setCrops] = useState<CropData[]>([{
    cropName: '',
    landSize: 0,
    landUnit: 'acres',
    expectedYield: 0,
    yieldUnit: 'kg',
    costOfProduction: 0,
    sellingPrice: 0,
    season: '',
    location: ''
  }])
  const [customSeasons, setCustomSeasons] = useState<{ [key: number]: boolean }>({})
  const [selectedSeasons, setSelectedSeasons] = useState<{ [key: number]: string }>({})
  const [displayCost, setDisplayCost] = useState<{ [key: number]: string }>({})
  const [displayPrice, setDisplayPrice] = useState<{ [key: number]: string }>({})

  const addCrop = () => {
    const newIndex = crops.length
    setCrops([...crops, {
      cropName: '',
      landSize: 0,
      landUnit: 'acres',
      expectedYield: 0,
      yieldUnit: 'kg',
      costOfProduction: 0,
      sellingPrice: 0,
      season: '',
      location: ''
    }])
    setCustomSeasons({ ...customSeasons, [newIndex]: false })
    setSelectedSeasons({ ...selectedSeasons, [newIndex]: '' })
    setDisplayCost({ ...displayCost, [newIndex]: '' })
    setDisplayPrice({ ...displayPrice, [newIndex]: '' })
  }

  const removeCrop = (index: number) => {
    if (crops.length > 1) {
      setCrops(crops.filter((_, i) => i !== index))
      const newCustomSeasons = { ...customSeasons }
      delete newCustomSeasons[index]
      setCustomSeasons(newCustomSeasons)
      const newSelectedSeasons = { ...selectedSeasons }
      delete newSelectedSeasons[index]
      setSelectedSeasons(newSelectedSeasons)
      const newDisplayCost = { ...displayCost }
      delete newDisplayCost[index]
      setDisplayCost(newDisplayCost)
      const newDisplayPrice = { ...displayPrice }
      delete newDisplayPrice[index]
      setDisplayPrice(newDisplayPrice)
    }
  }

  const updateCrop = (index: number, field: keyof CropData, value: any) => {
    const newCrops = [...crops]
    newCrops[index] = { ...newCrops[index], [field]: value }
    setCrops(newCrops)
  }

  const formatNumberWithCommas = (value: string): string => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    // Add commas
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleCostChange = (index: number, value: string) => {
    const formatted = formatNumberWithCommas(value)
    setDisplayCost({ ...displayCost, [index]: formatted })
    const numericValue = parseInt(value.replace(/\D/g, '')) || 0
    updateCrop(index, 'costOfProduction', numericValue)
  }

  const handlePriceChange = (index: number, value: string) => {
    const formatted = formatNumberWithCommas(value)
    setDisplayPrice({ ...displayPrice, [index]: formatted })
    const numericValue = parseInt(value.replace(/\D/g, '')) || 0
    updateCrop(index, 'sellingPrice', numericValue)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all crops have required data
    const isValid = crops.every(crop => 
      crop.cropName && 
      crop.landSize > 0 && 
      crop.expectedYield > 0 && 
      crop.costOfProduction > 0 && 
      crop.sellingPrice > 0 &&
      crop.season &&
      crop.location
    )

    if (!isValid) {
      alert('Please fill in all required fields for all crops')
      return
    }

    onGenerateReport(crops)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {crops.map((crop, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Crop {index + 1}</CardTitle>
            {crops.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeCrop(index)}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`crop-${index}`}>Crop Type *</Label>
                <Select
                  value={crop.cropName}
                  onValueChange={(value) => updateCrop(index, 'cropName', value)}
                >
                  <SelectTrigger id={`crop-${index}`}>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {UGANDAN_CROPS.map(cropName => (
                      <SelectItem key={cropName} value={cropName}>
                        {cropName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`location-${index}`}>Location *</Label>
                <Input
                  id={`location-${index}`}
                  type="text"
                  placeholder="e.g., Kampala, Mbale"
                  value={crop.location}
                  onChange={(e) => updateCrop(index, 'location', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`landSize-${index}`}>Land Size *</Label>
                <div className="flex gap-2">
                  <Input
                    id={`landSize-${index}`}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0"
                    value={crop.landSize || ''}
                    onChange={(e) => updateCrop(index, 'landSize', parseFloat(e.target.value) || 0)}
                    required
                    className="flex-1"
                  />
                  <Select
                    value={crop.landUnit}
                    onValueChange={(value: 'acres' | 'hectares') => updateCrop(index, 'landUnit', value)}
                  >
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="hectares">Hectares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`season-${index}`}>Season *</Label>
                {!customSeasons[index] ? (
                  <Select
                    value={selectedSeasons[index] || ''}
                    onValueChange={(value) => {
                      if (value === 'Custom') {
                        setCustomSeasons({ ...customSeasons, [index]: true })
                        setSelectedSeasons({ ...selectedSeasons, [index]: value })
                        updateCrop(index, 'season', '')
                      } else {
                        setSelectedSeasons({ ...selectedSeasons, [index]: value })
                        updateCrop(index, 'season', value)
                      }
                    }}
                  >
                    <SelectTrigger id={`season-${index}`}>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      {UGANDAN_SEASONS.map(season => (
                        <SelectItem key={season} value={season}>
                          {season}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      id={`season-${index}`}
                      type="text"
                      placeholder="Enter custom season"
                      value={crop.season}
                      onChange={(e) => updateCrop(index, 'season', e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCustomSeasons({ ...customSeasons, [index]: false })
                        setSelectedSeasons({ ...selectedSeasons, [index]: '' })
                        updateCrop(index, 'season', '')
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`yield-${index}`}>Expected Yield *</Label>
                <div className="flex gap-2">
                  <Input
                    id={`yield-${index}`}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0"
                    value={crop.expectedYield || ''}
                    onChange={(e) => updateCrop(index, 'expectedYield', parseFloat(e.target.value) || 0)}
                    required
                    className="flex-1"
                  />
                  <Select
                    value={crop.yieldUnit}
                    onValueChange={(value: 'kg' | 'tonnes') => updateCrop(index, 'yieldUnit', value)}
                  >
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kg</SelectItem>
                      <SelectItem value="tonnes">Tonnes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`cost-${index}`}>Cost of Production (UGX) *</Label>
                <Input
                  id={`cost-${index}`}
                  type="text"
                  placeholder="0"
                  value={displayCost[index] ?? (crop.costOfProduction ? crop.costOfProduction.toLocaleString() : '')}
                  onChange={(e) => handleCostChange(index, e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`price-${index}`}>Selling Price per {crop.yieldUnit === 'kg' ? 'Kg' : 'Tonne'} (UGX) *</Label>
                <Input
                  id={`price-${index}`}
                  type="text"
                  placeholder="0"
                  value={displayPrice[index] ?? (crop.sellingPrice ? crop.sellingPrice.toLocaleString() : '')}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={addCrop} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Another Crop
        </Button>
        <Button type="submit" className="flex-1">
          Generate Report
        </Button>
      </div>
    </form>
  )
}
