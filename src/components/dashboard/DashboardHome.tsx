import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { CropInputForm } from '../CropInputForm'
import { ReportView } from '../ReportView'
import { CropData, Report } from '../../types'
import { generateRecommendations } from '../../utils/recommendations'
import { projectId } from '../../utils/supabase/info'

interface DashboardHomeProps {
  username: string
  accessToken: string
  onReportGenerated?: () => void
}

export function DashboardHome({ username, accessToken, onReportGenerated }: DashboardHomeProps) {
  const [currentReport, setCurrentReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerateReport = async (crops: CropData[]) => {
    setLoading(true)

    // Calculate totals
    let totalLandSize = 0
    let totalCost = 0
    let totalRevenue = 0

    crops.forEach(crop => {
      const landInAcres = crop.landUnit === 'hectares' ? crop.landSize * 2.47105 : crop.landSize
      totalLandSize += landInAcres
      totalCost += crop.costOfProduction
      totalRevenue += crop.expectedYield * crop.sellingPrice
    })

    const totalProfit = totalRevenue - totalCost

    const report: Report = {
      crops,
      totalLandSize,
      totalCost: Math.round(totalCost),
      totalRevenue: Math.round(totalRevenue),
      totalProfit: Math.round(totalProfit),
      recommendations: [],
      createdAt: new Date().toISOString()
    }

    report.recommendations = generateRecommendations(crops, report)

    // Save report to backend
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f40baa9e/save-report`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify(report)
        }
      )

      if (response.ok) {
        // Trigger refresh in analytics
        onReportGenerated?.()
      } else {
        console.error('Error saving report')
      }
    } catch (err) {
      console.error('Failed to save report:', err)
    }

    setCurrentReport(report)
    setLoading(false)
  }

  const handleBackToDashboard = () => {
    setCurrentReport(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center bg-gradient-to-br from-white/90 to-green-50/90 dark:from-gray-800/90 dark:to-green-900/90 backdrop-blur-md p-12 rounded-2xl shadow-2xl border-2 border-green-300 dark:border-green-700">
          <div className="relative mx-auto w-16 h-16 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-md opacity-50 animate-pulse"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-green-600 dark:border-green-400"></div>
          </div>
          <p className="mt-4 text-gray-800 dark:text-gray-100 font-bold text-xl">Generating your report...</p>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Please wait while we analyze your data</p>
        </div>
      </div>
    )
  }

  if (currentReport) {
    return <ReportView report={currentReport} username={username} onBack={handleBackToDashboard} />
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100 dark:from-blue-900/40 dark:via-sky-900/40 dark:to-cyan-900/40 border-2 border-blue-300 dark:border-blue-700 rounded-xl flex items-start gap-4 shadow-lg">
        <div className="text-blue-600 dark:text-blue-400 text-3xl">🔒</div>
        <div>
          <p className="text-sm text-blue-900 dark:text-blue-200 font-semibold mb-1">
            <strong>Security Notice:</strong>
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-300">
            For your protection, you will be automatically logged out when you close this tab or browser.
          </p>
        </div>
      </div>

      <Card className="shadow-2xl dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 bg-white dark:border-green-600 border-2 border-green-200">
        <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-b-2 border-green-200 dark:border-green-700">
          <CardTitle className="dark:text-white text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">Farm Data Input</CardTitle>
          <CardDescription className="dark:text-gray-300 text-gray-700 font-medium">
            Enter your crop information to generate a comprehensive farm report with recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <CropInputForm onGenerateReport={handleGenerateReport} />
        </CardContent>
      </Card>
    </div>
  )
}