import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { BackgroundSlideshow } from './BackgroundSlideshow'
import { Footer } from './Footer'
import { ArrowLeft, Send, Mail } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { publicAnonKey, projectId } from '../utils/supabase/info'
import logoImage from 'figma:asset/64b13f9d2c96fcfd2df5bbb31b4ae89d8ec5929a.png'

interface FeedbackPageProps {
  onBack: () => void
  username?: string
}

export function FeedbackPage({ onBack, username }: FeedbackPageProps) {
  const [name, setName] = useState(username || '')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !email || !subject || !message) {
      toast.error('Please fill in all fields')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f40baa9e/send-feedback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message
          })
        }
      )

      const data = await response.json()

      if (response.ok) {
        // Check if email was actually sent or just saved
        if (data.emailSent === false || data.warning) {
          toast.success('✅ Feedback saved successfully! (Note: Email notification could not be sent)', {
            duration: 5000
          })
        } else {
          toast.success('✅ Feedback sent successfully! Thank you for your feedback.')
        }
        setName(username || '')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        console.error('Feedback submission error:', data)
        if (data.error?.includes('not configured')) {
          toast.error('⚠️ Email service not configured. Please contact the administrator to set up RESEND_API_KEY.')
        } else {
          toast.error(`❌ ${data.error || 'Failed to send feedback'}`)
        }
      }
    } catch (error) {
      console.error('Error sending feedback:', error)
      toast.error('❌ Failed to send feedback. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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

            <Card className="shadow-xl bg-white/95 backdrop-blur-sm animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Send Us Feedback</CardTitle>
                    <CardDescription className="mt-1">
                      We'd love to hear from you! Share your thoughts, suggestions, or report any issues.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    📧 <strong>Your feedback will be sent to:</strong> skvg256@gmail.com
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    We typically respond within 24-48 hours.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What is your feedback about?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please share your feedback, suggestions, or concerns..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={6}
                      className="bg-white resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Feedback
                      </>
                    )}
                  </Button>

                  <div className="text-sm text-center text-gray-600 bg-blue-50 p-3 rounded-md border border-blue-200">
                    Your feedback will be sent to our team and we'll get back to you as soon as possible.
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </BackgroundSlideshow>
  )
}
