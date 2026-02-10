import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Report } from '../types'
import { Download, ArrowLeft } from 'lucide-react'
import jsPDF from 'jspdf'
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import logoImage from 'figma:asset/64b13f9d2c96fcfd2df5bbb31b4ae89d8ec5929a.png'

interface ReportViewProps {
  report: Report
  username: string
  onBack: () => void
}

export function ReportView({ report, username, onBack }: ReportViewProps) {
  // Prepare data for charts
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']
  
  const costData = report.crops.map((crop, index) => ({
    name: crop.cropName,
    value: crop.costOfProduction,
    color: COLORS[index % COLORS.length]
  }))

  const revenueData = report.crops.map((crop, index) => ({
    name: crop.cropName,
    value: crop.expectedYield * crop.sellingPrice,
    color: COLORS[index % COLORS.length]
  }))

  const profitData = report.crops.map(crop => ({
    name: crop.cropName,
    profit: (crop.expectedYield * crop.sellingPrice) - crop.costOfProduction
  }))

  const downloadPDF = async () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPosition = 20

    // Load logo image once for reuse
    let logoImg: HTMLImageElement | null = null
    try {
      logoImg = new Image()
      logoImg.src = logoImage
      await new Promise((resolve) => {
        if (logoImg) {
          logoImg.onload = () => resolve(null)
        }
      })
    } catch (error) {
      console.error('Error loading logo:', error)
    }

    // Helper function to add watermark to current page
    const addWatermark = () => {
      if (logoImg) {
        // Add semi-transparent watermark in center
        doc.saveGraphicsState()
        doc.setGState(new doc.GState({ opacity: 0.2 }))
        const watermarkSize = 240
        doc.addImage(
          logoImg, 
          'PNG', 
          (pageWidth - watermarkSize) / 2, 
          (pageHeight - watermarkSize) / 2, 
          watermarkSize, 
          watermarkSize
        )
        doc.restoreGraphicsState()
      }
    }

    // Add logo to PDF header
    try {
      if (logoImg) {
        const imgWidth = 30
        const imgHeight = 30
        doc.addImage(logoImg, 'PNG', (pageWidth - imgWidth) / 2, yPosition, imgWidth, imgHeight)
      }
      yPosition += 35
    } catch (error) {
      console.error('Error adding logo to PDF:', error)
    }

    // Add watermark to first page
    addWatermark()

    // Header
    doc.setFontSize(20)
    doc.text('Uganda Farmer Report', pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 10

    doc.setFontSize(12)
    doc.text(`Farmer: ${username}`, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 6
    doc.text(`Date: ${new Date(report.createdAt).toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 15

    // Summary
    doc.setFontSize(14)
    doc.text('Financial Summary', 14, yPosition)
    yPosition += 8

    doc.setFontSize(10)
    const summaryData = [
      `Total Land Size: ${report.totalLandSize.toFixed(2)} acres`,
      `Total Cost of Production: UGX ${report.totalCost.toLocaleString()}`,
      `Total Expected Revenue: UGX ${report.totalRevenue.toLocaleString()}`,
      `Total Profit/Loss: UGX ${report.totalProfit.toLocaleString()}`
    ]

    summaryData.forEach(line => {
      doc.text(line, 14, yPosition)
      yPosition += 6
    })
    yPosition += 10

    // Crop Details
    doc.setFontSize(14)
    doc.text('Crop Details', 14, yPosition)
    yPosition += 8

    report.crops.forEach((crop, index) => {
      if (yPosition > 270) {
        doc.addPage()
        addWatermark()
        yPosition = 20
      }

      doc.setFontSize(11)
      doc.text(`${index + 1}. ${crop.cropName}`, 14, yPosition)
      yPosition += 6

      doc.setFontSize(9)
      const cropDetails = [
        `   Location: ${crop.location}`,
        `   Season: ${crop.season}`,
        `   Land Size: ${crop.landSize} ${crop.landUnit}`,
        `   Expected Yield: ${crop.expectedYield} ${crop.yieldUnit}`,
        `   Cost of Production: UGX ${crop.costOfProduction.toLocaleString()}`,
        `   Selling Price: UGX ${crop.sellingPrice.toLocaleString()} per ${crop.yieldUnit}`,
        `   Expected Revenue: UGX ${(crop.expectedYield * crop.sellingPrice).toLocaleString()}`,
        `   Profit/Loss: UGX ${((crop.expectedYield * crop.sellingPrice) - crop.costOfProduction).toLocaleString()}`
      ]

      cropDetails.forEach(line => {
        doc.text(line, 14, yPosition)
        yPosition += 5
      })
      yPosition += 5
    })

    // Key Recommendation
    if (yPosition > 240) {
      doc.addPage()
      addWatermark()
      yPosition = 20
    }

    doc.setFontSize(14)
    doc.text('Key Recommendation', 14, yPosition)
    yPosition += 8

    doc.setFontSize(9)
    const recLines = doc.splitTextToSize(report.recommendations[0], pageWidth - 28)
    recLines.forEach((line: string) => {
      if (yPosition > 280) {
        doc.addPage()
        addWatermark()
        yPosition = 20
      }
      doc.text(line, 14, yPosition)
      yPosition += 5
    })
    yPosition += 10

    // Conclusion
    if (yPosition > 240) {
      doc.addPage()
      addWatermark()
      yPosition = 20
    }

    doc.setFontSize(14)
    doc.text('Conclusion', 14, yPosition)
    yPosition += 8

    doc.setFontSize(9)
    const profitStatus = report.totalProfit >= 0 ? 'profitable' : 'showing losses'
    const conclusion = `Your farming operation with ${report.crops.length} crop(s) across ${report.totalLandSize.toFixed(2)} acres is currently ${profitStatus}. With a total ${report.totalProfit >= 0 ? 'profit' : 'loss'} of UGX ${Math.abs(report.totalProfit).toLocaleString()}, there are clear opportunities for improvement. By implementing the recommendation above and continuously monitoring your costs and revenues, you can work towards increasing your farm's profitability. Remember that successful farming requires patience, adaptation, and continuous learning. Keep detailed records and seek advice from agricultural extension officers and fellow farmers to maximize your success.`
    
    const conclusionLines = doc.splitTextToSize(conclusion, pageWidth - 28)
    conclusionLines.forEach((line: string) => {
      if (yPosition > 280) {
        doc.addPage()
        addWatermark()
        yPosition = 20
      }
      doc.text(line, 14, yPosition)
      yPosition += 5
    })

    doc.save(`farm-report-${new Date(report.createdAt).toISOString().split('T')[0]}.pdf`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-white/90 backdrop-blur-sm shadow-md">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <Button onClick={downloadPDF} className="flex items-center gap-2 shadow-md">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Card className="shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Land Size</p>
              <p className="text-2xl mt-1">{report.totalLandSize.toFixed(2)} acres</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Cost</p>
              <p className="text-2xl mt-1">UGX {report.totalCost.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Expected Revenue</p>
              <p className="text-2xl mt-1">UGX {report.totalRevenue.toLocaleString()}</p>
            </div>
            <div className={`${report.totalProfit >= 0 ? 'bg-emerald-50' : 'bg-red-50'} p-4 rounded-lg`}>
              <p className="text-sm text-gray-600">Profit/Loss</p>
              <p className={`text-2xl mt-1 ${report.totalProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                UGX {report.totalProfit.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Crop Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {report.crops.map((crop, index) => {
              const revenue = crop.expectedYield * crop.sellingPrice
              const profit = revenue - crop.costOfProduction
              
              return (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="text-lg mb-3">{crop.cropName}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <span className="ml-2">{crop.location}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Season:</span>
                      <span className="ml-2">{crop.season}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Land Size:</span>
                      <span className="ml-2">{crop.landSize} {crop.landUnit}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Expected Yield:</span>
                      <span className="ml-2">{crop.expectedYield} {crop.yieldUnit}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Cost:</span>
                      <span className="ml-2">UGX {crop.costOfProduction.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Price per {crop.yieldUnit}:</span>
                      <span className="ml-2">UGX {crop.sellingPrice.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Revenue:</span>
                      <span className="ml-2">UGX {revenue.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Profit/Loss:</span>
                      <span className={`ml-2 ${profit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                        UGX {profit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Cost Distribution by Crop</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `UGX ${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Revenue Distribution by Crop</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `UGX ${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Profit/Loss Analysis by Crop</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value >= 0 ? '' : '-'}${Math.abs(value / 1000)}K`} />
              <Tooltip formatter={(value: number) => `UGX ${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="profit" name="Profit/Loss (UGX)" fill="#10b981">
                {profitData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.profit >= 0 ? '#10b981' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Key Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
            <p>{report.recommendations[0]}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Conclusion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p>
              Your farming operation with {report.crops.length} crop(s) across {report.totalLandSize.toFixed(2)} acres is currently {report.totalProfit >= 0 ? 'profitable' : 'showing losses'}. With a total {report.totalProfit >= 0 ? 'profit' : 'loss'} of UGX {Math.abs(report.totalProfit).toLocaleString()}, there are clear opportunities for improvement.
            </p>
            <p>
              By implementing the recommendation above and continuously monitoring your costs and revenues, you can work towards increasing your farm's profitability. Remember that successful farming requires patience, adaptation, and continuous learning.
            </p>
            <p>
              Keep detailed records and seek advice from agricultural extension officers and fellow farmers to maximize your success. Your dedication to tracking and analyzing your farming data is already a strong step toward sustainable agricultural success.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
