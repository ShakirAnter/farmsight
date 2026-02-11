import image_1f5cc544cdbb2bb299c5cea8620cb3fee7fffa5a from 'figma:asset/1f5cc544cdbb2bb299c5cea8620cb3fee7fffa5a.png';
import { motion } from 'motion/react'
import { Target, Users, TrendingUp, Globe, Shield, Zap, Heart, Award, Lightbulb, CheckCircle, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import logoImage from 'figma:asset/64b13f9d2c96fcfd2df5bbb31b4ae89d8ec5929a.png'

export function AboutPage() {
  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'Empowering farmers in Uganda with modern agricultural tools and insights to maximize crop yields and profitability.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built for farmers, by people who understand agriculture. We listen to your needs and continuously improve.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: TrendingUp,
      title: 'Data-Driven Insights',
      description: 'Make informed decisions with real-time market prices, yield predictions, and comprehensive farming reports.',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Available in English, Luganda, and Swahili to serve all Ugandan farmers in their preferred language.',
      color: 'from-orange-500 to-amber-600'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your farming data is safe with industry-standard security. Works offline with automatic syncing when online.',
      color: 'from-red-500 to-rose-600'
    },
    {
      icon: Zap,
      title: 'Modern Technology',
      description: 'Progressive Web App (PWA) technology ensures fast performance and works on any device - mobile, tablet, or desktop.',
      color: 'from-indigo-500 to-violet-600'
    }
  ]

  const keyFeatures = [
    'Comprehensive crop input forms for all major Ugandan crops',
    'Professional PDF report generation with detailed analytics',
    'Live market price updates every 30 seconds',
    'Farming calendar with seasonal planning',
    'Crop comparison tools for better decision making',
    'Disease and pest management guides',
    'Video tutorials and farming tips',
    'Currency displayed in Ugandan Shillings (UGX)',
    'Dark mode for comfortable viewing',
    'Offline support with data synchronization',
    'Export data in multiple formats'
  ]

  const stats = [
    { value: '8+', label: 'Dashboard Sections' },
    { value: '20+', label: 'Supported Crops' },
    { value: '3', label: 'Languages' },
    { value: '100%', label: 'Free to Use' }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <img 
              src={logoImage} 
              alt="FarmSight Logo" 
              className="relative w-48 h-48 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent font-[Emilys_Candy] italic"
        >
          EMPOWERING AGRICULTURAL EXCELLENCE FOR A SUSTAINABLE FUTURE
        </motion.h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Utilisation of Available Resources for Community Development
        </p>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
          FarmSight is a comprehensive farming management platform designed specifically for Ugandan farmers. 
          We combine modern technology with traditional agricultural knowledge to help you maximize your farm's potential.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2">
            <CardContent className="text-center py-6">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Key Features List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
              Platform Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 border-2 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              To transform Ugandan agriculture through technology, making professional farming tools accessible to every farmer, 
              regardless of their location or resources. We envision a future where data-driven farming decisions lead to 
              increased yields, better income, and food security for all.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              Our Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              We believe in <strong>accessibility, innovation, and community</strong>. Every feature we build is designed with 
              farmers' real needs in mind. We're committed to keeping FarmSight free and continuously improving based on 
              feedback from our farming community.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Technology Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 border-2 border-indigo-200 dark:border-indigo-800">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              Built with Modern Technology
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              FarmSight is built as a Progressive Web App (PWA) using cutting-edge technologies:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">React & TypeScript</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Fast, reliable, and type-safe codebase for a smooth user experience.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Offline-First</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Works without internet. Your data syncs automatically when you're back online.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Responsive Design</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Perfect experience on any device - phone, tablet, or desktop computer.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact/Support Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Get Involved</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Have questions, suggestions, or need help? We'd love to hear from you!
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Use the <strong>Feedback</strong> button in the sidebar to send us your thoughts, report issues, or request new features. 
              Your input helps us make FarmSight better for everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">100% Free</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Always & Forever</div>
              </div>
              <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">No Ads</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Clean Experience</div>
              </div>
              <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">24/7 Access</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Anytime, Anywhere</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Developer Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 border-2 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2 text-[32px]">
              <User className="h-6 w-6 text-slate-600 dark:text-slate-400" />
              Developed By
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="inline-block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 text-white w-40 h-40 rounded-full flex items-center justify-center shadow-2xl mx-auto mb-4 overflow-hidden">
                  <img 
                    src={image_1f5cc544cdbb2bb299c5cea8620cb3fee7fffa5a} 
                    alt="Sujal Kerai" 
                    className="w-full h-full object-cover p-[0px] px-[0px] py-[-9px] scale-110"
                  />
                </div>
              </div>
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 dark:from-green-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent font-[Agbalumo] text-[48px]">
              Sujal Kerai
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Passionate about leveraging technology to solve real-world problems in agriculture. 
              FarmSight was built with the vision to make professional farming tools accessible to every farmer in Uganda.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">Specialization</div>
                <div className="font-semibold text-gray-900 dark:text-white">Web Development</div>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">Focus</div>
                <div className="font-semibold text-gray-900 dark:text-white">AgriTech Solutions</div>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                <div className="font-semibold text-gray-900 dark:text-white">Uganda</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}