import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import { BackgroundSlideshow } from './BackgroundSlideshow'
import { motion } from 'motion/react'
import { Eye, EyeOff } from 'lucide-react'
import logoImage from 'figma:asset/64b13f9d2c96fcfd2df5bbb31b4ae89d8ec5929a.png'

interface SignupPageProps {
  onSignupSuccess: () => void
  onSwitchToLogin: () => void
  onSwitchToInfo: () => void
  onSwitchToFeedback: () => void
}

export function SignupPage({ onSignupSuccess, onSwitchToLogin, onSwitchToInfo, onSwitchToFeedback }: SignupPageProps) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f40baa9e/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ email, password, username })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        console.error('Signup error:', data.error)
        const errorMessage = data.error || 'Failed to create account'
        
        // Check if user already exists
        if (errorMessage.includes('already been registered') || 
            errorMessage.includes('already exists') || 
            data.code === 'user_exists') {
          setError('⚠️ An account with this email already exists. If this is you, please use the "Log In" button below.')
        } else {
          setError(errorMessage)
        }
        setLoading(false)
        return
      }

      // Clear form
      setEmail('')
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      setLoading(false)
      
      alert('✅ Account created successfully! You can now log in with your credentials.')
      onSignupSuccess()
    } catch (err) {
      console.error('Signup exception:', err)
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
          <Card className="shadow-2xl bg-white/50 backdrop-blur-sm">
            <CardHeader className="space-y-2">
              <motion.div 
                className="flex justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
              >
                <img 
                  src={logoImage} 
                  alt="FarmSight Logo" 
                  className="w-32 h-32 object-contain"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-1"
              >
                <CardTitle className="text-center text-xl">EMPOWERING AGRICULTURAL EXCELLENCE</CardTitle>
                <p className="text-center text-muted-foreground text-sm uppercase">
                  Utilisation of Available Resources for Community Development
                </p>
                <CardDescription className="text-center">
                  Create your account to join the farming community
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <p className="text-sm">
                  💡 <strong>Tip:</strong> Choose a strong password that you'll remember. You'll need it to log in later.
                </p>
              </motion.div>
              
              <motion.form 
                onSubmit={handleSignup} 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

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
                  placeholder="At least 6 characters"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                <p>{error}</p>
                {error.includes('already registered') && (
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="mt-2 text-sm underline hover:no-underline"
                  >
                    Go to Login →
                  </button>
                )}
              </div>
            )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </motion.form>

              <motion.div 
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={onSwitchToLogin}
                    className="text-green-600 hover:underline"
                  >
                    Log In
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
