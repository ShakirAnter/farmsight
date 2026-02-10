import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { getSupabaseClient } from '../utils/supabase/client'
import { BackgroundSlideshow } from './BackgroundSlideshow'
import { motion } from 'motion/react'
import { Eye, EyeOff } from 'lucide-react'
import { offlineStorage } from '../utils/offlineStorage'
import logoImage from 'figma:asset/64b13f9d2c96fcfd2df5bbb31b4ae89d8ec5929a.png'

interface LoginPageProps {
  onLoginSuccess: (accessToken: string, username: string) => void
  onSwitchToSignup: () => void
  onSwitchToInfo: () => void
  onSwitchToFeedback: () => void
}

export function LoginPage({ onLoginSuccess, onSwitchToSignup, onSwitchToInfo, onSwitchToFeedback }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const supabase = getSupabaseClient()

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Login error:', error)
        // Provide more user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          setError('❌ Invalid email or password. Please double-check your credentials. If you just signed up, make sure you\'re using the exact password you created.')
        } else if (error.message.includes('Email not confirmed')) {
          setError('Please confirm your email address before logging in.')
        } else {
          setError(error.message)
        }
        setLoading(false)
        return
      }

      if (data.session?.access_token) {
        const username = data.user?.user_metadata?.username || email.split('@')[0]
        onLoginSuccess(data.session.access_token, username)
      }
    } catch (err) {
      console.error('Login exception:', err)
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <BackgroundSlideshow>
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-2 border-green-200 dark:border-green-700">
            <CardHeader className="space-y-2 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-b-2 border-green-200 dark:border-green-700">
              <motion.div 
                className="flex justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                  <img 
                    src={logoImage} 
                    alt="FarmSight Logo" 
                    className="relative w-32 h-32 object-contain drop-shadow-2xl"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-1"
              >
                <CardTitle className="text-center text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">EMPOWERING AGRICULTURAL EXCELLENCE</CardTitle>
                <p className="text-center text-gray-700 dark:text-gray-300 text-sm uppercase font-semibold">
                  Utilisation of Available Resources for Community Development
                </p>
                <CardDescription className="text-center dark:text-gray-400 font-medium">
                  Log in to manage your farm and generate reports
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="pt-6">
              <motion.div 
                className="mb-4 bg-gradient-to-r from-blue-100 to-sky-100 dark:from-blue-900/40 dark:to-sky-900/40 border-2 border-blue-300 dark:border-blue-600 text-blue-800 dark:text-blue-200 px-4 py-3 rounded-xl shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <p className="text-sm font-medium">
                  👋 <strong>New here?</strong> Create an account first to get started!
                </p>
              </motion.div>

              <motion.div 
                className="mb-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 border-2 border-green-300 dark:border-green-600 text-green-800 dark:text-green-200 px-4 py-3 rounded-xl shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <p className="text-sm font-medium">
                  🔒 <strong>Security:</strong> You'll be automatically logged out when you close this page.
                </p>
              </motion.div>
              
              <motion.form 
                onSubmit={handleLogin} 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="farmer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Log In'}
                </Button>
              </motion.form>

              <motion.div 
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <p className="text-sm text-gray-600">
                  Forgot your password?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      if (email) {
                        alert(`Password reset not yet configured. Please contact support with your email: ${email}`)
                      } else {
                        alert('Please enter your email address first, then click here for password reset instructions.')
                      }
                    }}
                    className="text-green-600 hover:underline"
                  >
                    Reset Password
                  </button>
                </p>
              </motion.div>

              <motion.div 
                className="mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={onSwitchToSignup}
                    className="text-green-600 hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              </motion.div>

              <motion.div 
                className="mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <p className="text-sm text-gray-600">
                  <button
                    onClick={onSwitchToInfo}
                    className="text-blue-600 hover:underline"
                  >
                    ℹ️ About FarmSight
                  </button>
                  {' | '}
                  <button
                    onClick={onSwitchToFeedback}
                    className="text-green-600 hover:underline"
                  >
                    💬 Send Feedback
                  </button>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </BackgroundSlideshow>
  )
}