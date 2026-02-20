import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { BackgroundSlideshow } from './BackgroundSlideshow'
import { Footer } from './Footer'
import { ArrowLeft, Mail, ExternalLink } from 'lucide-react'
import logoImage from 'figma:asset/64b13f9d2c96fcfd2df5bbb31b4ae89d8ec5929a.png'

interface FeedbackPageProps {
  onBack: () => void
  username?: string
}

export function FeedbackPage({ onBack }: FeedbackPageProps) {
  const googleFormUrl = 'https://forms.gle/AyoFtTFP6rSLzcCc7'

  return (
    <BackgroundSlideshow>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center flex flex-col items-center">
              <img 
                src={logoImage} 
                alt="FarmSight Logo" 
                className="w-24 h-24 object-contain mb-3 drop-shadow-lg"
              />
              <h1 className="text-white text-2xl md:text-3xl tracking-wider mb-1">
                EMPOWERING AGRICULTURAL EXCELLENCE
              </h1>
              <h2 className="text-white/90 text-xl md:text-2xl tracking-wide">
                UTILISATION OF AVAILABLE RESOURCES FOR COMMUNITY DEVELOPMENT
              </h2>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Button
              variant="outline"
              onClick={onBack}
              className="mb-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm shadow-md hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Card className="shadow-xl bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 border-2 border-green-200 dark:border-green-700">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-b border-green-200 dark:border-green-700">
                <CardTitle className="flex items-center gap-2 text-2xl text-green-800 dark:text-green-300">
                  <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                  Send Us Your Feedback
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  We value your feedback! Please share your thoughts, suggestions, or report any issues.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Google Form Embedded */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-l-4 border-green-600 dark:border-green-500 rounded-lg p-4 mb-4 shadow-md">
                    <p className="text-sm text-green-800 dark:text-green-300 flex items-start gap-2">
                      <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                      <span>
                        Your feedback will be sent to <strong className="text-green-900 dark:text-green-200">farmsight11@gmail.com</strong>. 
                        We typically respond within 24-48 hours.
                      </span>
                    </p>
                  </div>

                  {/* Embedded Google Form */}
                  <div className="rounded-xl overflow-hidden border-2 border-green-200 dark:border-green-700 shadow-lg bg-white dark:bg-gray-900">
                    <iframe 
                      src={googleFormUrl}
                      width="100%" 
                      height="800" 
                      frameBorder="0" 
                      marginHeight={0} 
                      marginWidth={0}
                      className="w-full"
                      title="FarmSight Feedback Form"
                    >
                      Loading feedback form...
                    </iframe>
                  </div>

                  {/* Alternative: Open in new tab button */}
                  <div className="text-center pt-2">
                    <Button
                      variant="outline"
                      onClick={() => window.open(googleFormUrl, '_blank')}
                      className="flex items-center gap-2 mx-auto bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-600 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-800 dark:text-green-300 shadow-md"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open Form in New Tab
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </BackgroundSlideshow>
  )
}