import React from 'react'
import { DashboardLayout, Card, CardHeader, CardBody, Button, Input, Select } from '@/components'
import { useUIStore } from '@/store'
import { Save, Bell, Lock, User, Palette } from 'lucide-react'

export const SettingsPage: React.FC = () => {
  const { darkMode, toggleDarkMode } = useUIStore()
  const [settings, setSettings] = React.useState({
    email: 'john.doe@example.com',
    fullName: 'John Doe',
    company: 'Analytics Inc',
    notifications: true,
    emailNotifications: true,
    weeklyReport: true,
  })

  const handleSave = () => {
    // Save settings
    console.log('Settings saved:', settings)
  }

  return (
    <DashboardLayout title="Settings" showSidebar showHeader>
      <div className="space-y-6 max-w-2xl animate-fade-in">
        {/* Profile Settings */}
        <Card>
          <CardHeader title="Profile Settings" subtitle="Manage your account information" />
          <CardBody className="space-y-4">
            <Input
              label="Full Name"
              value={settings.fullName}
              onChange={(e) => setSettings({ ...settings, fullName: e.target.value })}
              fullWidth
            />
            <Input
              label="Email Address"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              fullWidth
            />
            <Input
              label="Company"
              value={settings.company}
              onChange={(e) => setSettings({ ...settings, company: e.target.value })}
              fullWidth
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} icon={<Save className="h-4 w-4" />}>
                Save Changes
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader title="Appearance" subtitle="Customize dashboard look and feel" />
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Use dark theme for reduced eye strain</p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={clsx(
                  'relative inline-flex h-8 w-14 items-center rounded-full transition-colors',
                  darkMode ? 'bg-primary-500' : 'bg-gray-300',
                )}
              >
                <span
                  className={clsx(
                    'inline-block h-6 w-6 transform rounded-full bg-white transition-transform',
                    darkMode ? 'translate-x-7' : 'translate-x-1',
                  )}
                />
              </button>
            </div>
          </CardBody>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader title="Notifications" subtitle="Control how you receive alerts" />
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive in-app notifications</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                className="h-5 w-5 rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get updates via email</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                className="h-5 w-5 rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Weekly Report</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Send weekly summary report</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.weeklyReport}
                onChange={(e) => setSettings({ ...settings, weeklyReport: e.target.checked })}
                className="h-5 w-5 rounded cursor-pointer"
              />
            </div>
          </CardBody>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader title="Security" subtitle="Manage your account security" />
          <CardBody className="space-y-4">
            <Button variant="secondary" icon={<Lock className="h-4 w-4" />} fullWidth>
              Change Password
            </Button>
            <Button variant="secondary" icon={<Lock className="h-4 w-4" />} fullWidth>
              Enable Two-Factor Authentication
            </Button>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}

function clsx(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
