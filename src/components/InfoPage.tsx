import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { BackgroundSlideshow } from './BackgroundSlideshow'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import logoImage from 'figma:asset/64b13f9d2c96fcfd2df5bbb31b4ae89d8ec5929a.png'

interface InfoPageProps {
  onBack: () => void
}

export function InfoPage({ onBack }: InfoPageProps) {
  return (
    <BackgroundSlideshow>
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          <Card className="shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-4">
              <motion.div 
                className="flex justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
              >
                <img 
                  src={logoImage} 
                  alt="FarmSight Logo" 
                  className="w-40 h-40 object-contain"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-2"
              >
                <CardTitle className="text-center">About FarmSight</CardTitle>
                <p className="text-center text-green-700 uppercase">
                  Empowering Agricultural Excellence
                </p>
                <p className="text-center text-green-600 text-sm uppercase">
                  Utilisation of Available Resources for Community Development
                </p>
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-teal-50 border border-teal-300 p-6 rounded-lg"
              >
                <h3 className="text-teal-800 mb-3">Objective of the Website</h3>
                <p className="text-gray-700 mb-3">
                  The core objectives of FarmSight are to revolutionize farming in Uganda by addressing critical 
                  agricultural challenges through innovative technology solutions:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Digitize Farm Records:</strong> Enable farmers to maintain accurate digital records of all farming activities, eliminating paper-based systems and data loss</li>
                  <li>• <strong>Enhance Financial Literacy:</strong> Provide transparent financial insights showing exact costs, revenues, and profitability for each crop in Ugandan Shillings (UGX)</li>
                  <li>• <strong>Improve Crop Yields:</strong> Deliver data-driven recommendations for fertilizer application, pest control, and crop management based on actual farm data</li>
                  <li>• <strong>Facilitate Access to Credit:</strong> Generate professional PDF reports that farmers can present to banks and microfinance institutions for loan applications</li>
                  <li>• <strong>Promote Sustainable Practices:</strong> Guide farmers toward environmentally responsible farming methods that protect soil health and natural resources</li>
                  <li>• <strong>Build Agricultural Capacity:</strong> Educate farmers on modern agricultural techniques through intelligent recommendations and best practice guidance</li>
                  <li>• <strong>Support Community Development:</strong> Maximize the utilization of available resources to strengthen farming communities and improve rural livelihoods</li>
                  <li>• <strong>Ensure Data Security:</strong> Protect sensitive farmer information with secure authentication and automatic logout features for shared computer environments</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-emerald-50 border border-emerald-300 p-6 rounded-lg"
              >
                <h3 className="text-emerald-800 mb-3">Aim of the Website</h3>
                <p className="text-gray-700">
                  The primary aim of FarmSight is to transform agricultural practices in Uganda by providing farmers 
                  with a comprehensive digital platform that enables precise crop management, financial tracking, and 
                  data-driven decision-making. We aim to bridge the gap between traditional farming methods and modern 
                  technology, ensuring that every farmer, regardless of their location or resources, has access to 
                  intelligent farming tools that maximize productivity, profitability, and sustainability.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-amber-50 border border-amber-300 p-6 rounded-lg"
              >
                <h3 className="text-amber-800 mb-3">Purpose of the Website</h3>
                <p className="text-gray-700 mb-3">
                  FarmSight serves as a complete agricultural management solution designed specifically for Ugandan 
                  farmers to:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Track and Manage Crops:</strong> Record all inputs, expenses, and yields for major crops grown in Uganda</li>
                  <li>• <strong>Calculate Financial Performance:</strong> Automatically compute profits, losses, and return on investment in UGX</li>
                  <li>• <strong>Receive Expert Recommendations:</strong> Get personalized farming advice based on actual crop data and local conditions</li>
                  <li>• <strong>Generate Professional Reports:</strong> Create and download comprehensive PDF reports for banks, cooperatives, and personal records</li>
                  <li>• <strong>Secure Data Management:</strong> Protect farmer information with robust authentication and automatic logout features</li>
                  <li>• <strong>Plan Future Seasons:</strong> Make informed decisions using historical data and intelligent insights</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="bg-green-50 border border-green-200 p-6 rounded-lg"
              >
                <h3 className="text-green-800 mb-3">Our Mission</h3>
                <p className="text-gray-700">
                  FarmSight is dedicated to empowering farmers in Uganda through technology and data-driven insights. 
                  We help farmers make informed decisions about their crops, optimize resource utilization, and improve 
                  their agricultural practices for better yields and sustainable community development.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="bg-orange-50 border border-orange-200 p-6 rounded-lg"
              >
                <h3 className="text-orange-800 mb-3">Problems We Solve</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Poor Record Keeping:</strong> Digital tracking of all crop data and farm operations</li>
                  <li>• <strong>Lack of Financial Insights:</strong> Automated profit/loss calculations and financial analysis</li>
                  <li>• <strong>Limited Access to Expert Advice:</strong> AI-powered recommendations based on your data</li>
                  <li>• <strong>Difficulty Planning:</strong> Historical data and trends help plan future seasons</li>
                  <li>• <strong>Insecure Data Storage:</strong> Cloud-based secure storage with automatic logout</li>
                  <li>• <strong>Communication Barriers:</strong> Downloadable PDF reports for sharing with banks and cooperatives</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="bg-blue-50 border border-blue-200 p-6 rounded-lg"
              >
                <h3 className="text-blue-800 mb-3">Key Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Comprehensive crop input tracking for all major Ugandan crops</li>
                  <li>• Detailed financial analysis and profit calculations</li>
                  <li>• AI-powered farming recommendations</li>
                  <li>• PDF report generation for easy sharing and record-keeping</li>
                  <li>• Secure farmer authentication system</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="bg-purple-50 border border-purple-200 p-6 rounded-lg"
              >
                <h3 className="text-purple-800 mb-3">Developed By</h3>
                <p className="text-gray-700">
                  <strong>Sujal Kerai Soft Tech</strong>
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Committed to building innovative solutions that empower agricultural communities 
                  and promote sustainable development through technology.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="pt-4"
              >
                <Button 
                  onClick={onBack} 
                  className="w-full flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </BackgroundSlideshow>
  )
}
