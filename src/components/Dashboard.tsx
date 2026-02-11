import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { CropInputForm } from './CropInputForm'
import { ReportView } from './ReportView'
import { CropData, Report } from '../types'
import { generateRecommendations } from '../utils/recommendations'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import { LogOut, MessageSquare } from 'lucide-react'
import { DashboardBackgroundSlideshow } from './DashboardBackgroundSlideshow'
import { Footer } from './Footer'
import logoImage from 'figma:asset/64b13f9d2c96fcfd2df5bbb31b4ae89d8ec5929a.png'

interface DashboardProps {
  username: string
  accessToken: string
  onLogout: () => void
  onSwitchToFeedback: () => void
}

export function Dashboard({ username, accessToken, onLogout, onSwitchToFeedback }: DashboardProps) {
  const [currentReport, setCurrentReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerateReport = async (crops: CropData[]) => {
    setLoading(true)

    // Calculate totals
    let totalLandSize = 0
    let totalCost = 0
    let totalRevenue = 0

    crops.forEach(crop => {
      // Convert land to acres for consistency
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

    // Generate recommendations
    report.recommendations = generateRecommendations(crops, report)

    // Note: Reports are generated locally without backend storage
    // This allows the app to work without authentication

    setCurrentReport(report)
    setLoading(false)
  }

  const handleBackToDashboard = () => {
    setCurrentReport(null)
  }

  if (loading) {
    return (
      <DashboardBackgroundSlideshow>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Generating your report...</p>
          </div>
        </div>
      </DashboardBackgroundSlideshow>
    )
  }

  if (currentReport) {
    return (
      <DashboardBackgroundSlideshow>
        <div className="min-h-screen">
          <header className="bg-white/90 backdrop-blur-sm border-b shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="FarmSight Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1>Uganda Farmer Portal</h1>
                <p className="text-sm text-gray-600">Welcome, {username}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onSwitchToFeedback} className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Feedback
              </Button>
              <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>
          <main className="max-w-6xl mx-auto px-4 py-8">
            <ReportView report={currentReport} username={username} onBack={handleBackToDashboard} />
          </main>
          <Footer variant="light" />
        </div>
      </DashboardBackgroundSlideshow>
    )
  }

  return (
    <DashboardBackgroundSlideshow>
      <div className="min-h-screen">
        <header className="bg-white/90 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="FarmSight Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1>Uganda Farmer Portal</h1>
              <p className="text-sm text-gray-600">Welcome, {username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onSwitchToFeedback} className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Feedback
            </Button>
            <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
            <div className="text-blue-600 text-xl">🔒</div>
            <div>
              <p className="text-sm text-blue-800">
                <strong>Security Notice:</strong> For your protection, you will be automatically logged out when you close this tab or browser.
              </p>
            </div>
          </div>
          
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>Farm Data Input</CardTitle>
              <CardDescription>
                Enter your crop information to generate a comprehensive farm report with recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CropInputForm onGenerateReport={handleGenerateReport} />
            </CardContent>
          </Card>
        </main>
        <Footer variant="light" />
      </div>
    </DashboardBackgroundSlideshow>
  )
}