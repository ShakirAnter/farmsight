import { CropData, Report } from '../types'

export function generateRecommendations(crops: CropData[], report: Report): string[] {
  // Analyze the data to provide ONE key recommendation
  let recommendation = ''

  // Priority 1: Check for overall loss
  if (report.totalProfit < 0) {
    recommendation = '⚠️ Your overall operation is showing a loss. We recommend focusing on reducing production costs and improving market access to get better selling prices. Consider consulting with agricultural extension officers to optimize your input use and explore cooperative marketing options.'
    return [recommendation]
  }

  // Priority 2: Check for unprofitable crops
  const unprofitableCrops = crops.filter(crop => {
    const revenue = crop.expectedYield * crop.sellingPrice
    const profit = revenue - crop.costOfProduction
    return profit < 0
  })

  if (unprofitableCrops.length > 0) {
    const cropList = unprofitableCrops.map(c => c.cropName).join(', ')
    recommendation = `📉 Some of your crops (${cropList}) are showing losses. We recommend either reducing input costs for these crops, improving yields through better farming practices, or replacing them with more profitable alternatives. Consult with fellow farmers or extension workers about high-value crops suitable for your region.`
    return [recommendation]
  }

  // Priority 3: Check for high-performing crops to expand
  const highPerformingCrops = crops.filter(crop => {
    const revenue = crop.expectedYield * crop.sellingPrice
    const profit = revenue - crop.costOfProduction
    const profitMargin = (profit / crop.costOfProduction) * 100
    return profitMargin > 50
  })

  if (highPerformingCrops.length > 0) {
    const bestCrop = highPerformingCrops[0]
    const revenue = bestCrop.expectedYield * bestCrop.sellingPrice
    const profit = revenue - bestCrop.costOfProduction
    const profitMargin = ((profit / bestCrop.costOfProduction) * 100).toFixed(0)
    recommendation = `🌟 Excellent work! Your ${bestCrop.cropName} is showing a strong profit margin of ${profitMargin}%. We recommend expanding production of this high-performing crop while maintaining your current diversification strategy. Consider reinvesting profits into quality inputs and better farming techniques to further improve yields.`
    return [recommendation]
  }

  // Priority 4: Check for lack of diversification
  if (crops.length === 1) {
    recommendation = '🌾 Growing only one crop exposes you to significant risk from market price fluctuations, weather changes, and pests. We strongly recommend diversifying by adding 2-3 different crops. This reduces risk and can provide income throughout different seasons. Consider crops that complement each other, such as intercropping matooke with coffee or beans.'
    return [recommendation]
  }

  // Priority 5: General positive advice for profitable, diversified farms
  const avgProfitPerAcre = report.totalProfit / report.totalLandSize
  recommendation = `✅ Your farming operation is performing well with an average profit of UGX ${Math.round(avgProfitPerAcre).toLocaleString()} per acre. To continue improving, we recommend joining a farmers cooperative to access better input prices and markets, staying informed about market prices through agricultural extension officers, and considering rainwater harvesting or irrigation systems to reduce weather dependency.`
  
  return [recommendation]
}
