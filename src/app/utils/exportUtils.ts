import { Report, CropData, Expense } from '../types'

export function exportReportToCSV(report: Report, username: string) {
  // Create CSV content
  let csv = 'Uganda Farmer Portal - Farm Report\n'
  csv += `Generated: ${new Date(report.createdAt).toLocaleDateString()}\n`
  csv += `Farmer: ${username}\n\n`
  
  // Crop data
  csv += 'CROP DATA\n'
  csv += 'Crop Name,Land Size,Land Unit,Expected Yield,Yield Unit,Cost of Production (UGX),Selling Price (UGX/unit),Season,Location,Expected Revenue (UGX)\n'
  
  report.crops.forEach(crop => {
    const revenue = crop.expectedYield * crop.sellingPrice
    csv += `"${crop.cropName}",${crop.landSize},${crop.landUnit},${crop.expectedYield},${crop.yieldUnit},${crop.costOfProduction},${crop.sellingPrice},"${crop.season}","${crop.location}",${revenue}\n`
  })
  
  // Summary
  csv += '\nSUMMARY\n'
  csv += `Total Land Size (acres),${report.totalLandSize.toFixed(2)}\n`
  csv += `Total Cost (UGX),${report.totalCost}\n`
  csv += `Total Revenue (UGX),${report.totalRevenue}\n`
  csv += `Total Profit (UGX),${report.totalProfit}\n`
  
  // Recommendations
  if (report.recommendations.length > 0) {
    csv += '\nRECOMMENDATIONS\n'
    report.recommendations.forEach((rec, index) => {
      csv += `${index + 1},"${rec}"\n`
    })
  }
  
  // Expenses if available
  if (report.expenses && report.expenses.length > 0) {
    csv += '\\nEXPENSES\\n'
    csv += 'Date,Category,Description,Amount (UGX),Crop\\n'
    report.expenses.forEach(expense => {
      csv += `${new Date(expense.date).toLocaleDateString()},\"${expense.category}\",\"${expense.description}\",${expense.amount},\"${expense.cropRelated || 'General'}\"\\n`
    })
  }
  
  // Create and download file
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `farm-report-${new Date(report.createdAt).toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportAllReportsToCSV(reports: Report[], username: string) {
  let csv = 'Uganda Farmer Portal - All Farm Reports\n'
  csv += `Exported: ${new Date().toLocaleDateString()}\n`
  csv += `Farmer: ${username}\n\n`
  
  csv += 'REPORTS SUMMARY\n'
  csv += 'Date,Season,Total Land (acres),Total Cost (UGX),Total Revenue (UGX),Total Profit (UGX),Number of Crops\n'
  
  reports.forEach(report => {
    csv += `${new Date(report.createdAt).toLocaleDateString()},"${report.season || 'N/A'}",${report.totalLandSize.toFixed(2)},${report.totalCost},${report.totalRevenue},${report.totalProfit},${report.crops.length}\n`
  })
  
  // Detailed crop data
  csv += '\n\nDETAILED CROP DATA\n'
  csv += 'Report Date,Crop Name,Land Size,Land Unit,Expected Yield,Yield Unit,Cost of Production (UGX),Selling Price (UGX/unit),Season,Location\n'
  
  reports.forEach(report => {
    report.crops.forEach(crop => {
      csv += `${new Date(report.createdAt).toLocaleDateString()},"${crop.cropName}",${crop.landSize},${crop.landUnit},${crop.expectedYield},${crop.yieldUnit},${crop.costOfProduction},${crop.sellingPrice},"${crop.season}","${crop.location}"\n`
    })
  })
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `all-farm-reports-${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportExpensesToCSV(expenses: Expense[], username: string) {
  let csv = 'Uganda Farmer Portal - Expense Report\\n'
  csv += `Exported: ${new Date().toLocaleDateString()}\\n`
  csv += `Farmer: ${username}\\n\\n`
  
  csv += 'Date,Category,Description,Amount (UGX),Crop\\n'
  
  expenses.forEach(expense => {
    csv += `${new Date(expense.date).toLocaleDateString()},\"${expense.category}\",\"${expense.description}\",${expense.amount},\"${expense.cropRelated || 'General'}\"\\n`
  })
  
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  csv += `\\nTotal Expenses,,,${total},\\n`
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `expenses-${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}