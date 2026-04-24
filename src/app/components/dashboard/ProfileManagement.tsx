import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User, Mail, MapPin, Phone, Edit, Save, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { projectId } from '../../utils/supabase/info'
import { ugandanDistricts } from '../../utils/ugandanDistricts'
import { getSupabaseClient } from '../../utils/supabase/client'

interface ProfileManagementProps {
  username: string
  accessToken: string
}

interface UserProfile {
  farmName: string
  farmLocation: string
  farmSize: string
  farmSizeUnit: 'acres' | 'hectares'
  phoneNumber: string
  email: string
  district: string
}

export function ProfileManagement({ username, accessToken }: ProfileManagementProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    farmName: '',
    farmLocation: '',
    farmSize: '',
    farmSizeUnit: 'acres',
    phoneNumber: '',
    email: '',
    district: ''
  })
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f40baa9e/get-profile`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        if (data.profile) {
          setProfile(data.profile)
        }
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err)
    }
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f40baa9e/update-profile`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify(profile)
        }
      )

      if (response.ok) {
        toast.success('Profile updated successfully!')
        setIsEditing(false)
      } else {
        toast.error('Failed to update profile')
      }
    } catch (err) {
      console.error('Failed to save profile:', err)
      toast.error('An error occurred while saving')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match')
      return
    }

    if (passwords.new.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setIsSaving(true)
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      })

      if (error) {
        toast.error('Failed to change password: ' + error.message)
      } else {
        toast.success('Password changed successfully!')
        setIsChangingPassword(false)
        setPasswords({ current: '', new: '', confirm: '' })
      }
    } catch (err) {
      console.error('Failed to change password:', err)
      toast.error('An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="dark:text-white">Profile Management</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your account information and farm details
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  {getInitials(username)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold dark:text-white">{username}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {profile.farmName || 'Farm Owner'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {profile.district || 'Uganda'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Farm Information */}
        <Card className="lg:col-span-2 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="dark:text-white">Farm Information</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Your farm details and contact information
                </CardDescription>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="farmName" className="dark:text-gray-300">Farm Name</Label>
                <Input
                  id="farmName"
                  value={profile.farmName}
                  onChange={(e) => setProfile({ ...profile, farmName: e.target.value })}
                  disabled={!isEditing}
                  className="dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your farm name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="dark:bg-gray-700 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="dark:text-gray-300">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                  disabled={!isEditing}
                  className="dark:bg-gray-700 dark:text-white"
                  placeholder="+256 700 000 000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="district" className="dark:text-gray-300">District</Label>
                <Select
                  value={profile.district}
                  onValueChange={(v) => setProfile({ ...profile, district: v })}
                  disabled={!isEditing}
                >
                  <SelectTrigger id="district" className="dark:bg-gray-700 dark:text-white">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {ugandanDistricts.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmLocation" className="dark:text-gray-300">Farm Location</Label>
                <Input
                  id="farmLocation"
                  value={profile.farmLocation}
                  onChange={(e) => setProfile({ ...profile, farmLocation: e.target.value })}
                  disabled={!isEditing}
                  className="dark:bg-gray-700 dark:text-white"
                  placeholder="Village/Town"
                />
              </div>

              <div className="space-y-2">
                <Label className="dark:text-gray-300">Farm Size</Label>
                <div className="flex gap-2">
                  <Input
                    value={profile.farmSize}
                    onChange={(e) => setProfile({ ...profile, farmSize: e.target.value })}
                    disabled={!isEditing}
                    className="dark:bg-gray-700 dark:text-white"
                    placeholder="0"
                    type="number"
                  />
                  <Select
                    value={profile.farmSizeUnit}
                    onValueChange={(v: 'acres' | 'hectares') => setProfile({ ...profile, farmSizeUnit: v })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="w-32 dark:bg-gray-700 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="hectares">Hectares</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveProfile} disabled={isSaving} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false)
                    fetchProfile()
                  }}
                  variant="outline"
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Change Password */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Change Password</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Update your account password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isChangingPassword ? (
            <Button onClick={() => setIsChangingPassword(true)} variant="outline">
              Change Password
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="dark:text-gray-300">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      className="dark:bg-gray-700 dark:text-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="dark:text-gray-300">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      className="dark:bg-gray-700 dark:text-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="dark:text-gray-300">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="dark:bg-gray-700 dark:text-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleChangePassword} disabled={isSaving}>
                  {isSaving ? 'Changing...' : 'Change Password'}
                </Button>
                <Button
                  onClick={() => {
                    setIsChangingPassword(false)
                    setPasswords({ current: '', new: '', confirm: '' })
                  }}
                  variant="outline"
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
