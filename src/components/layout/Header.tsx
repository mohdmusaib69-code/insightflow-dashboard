import React, { useState } from 'react'
import { useUIStore } from '@/store'
import clsx from 'clsx'
import {
  Menu,
  X,
  Sun,
  Moon,
  Bell,
  User,
  Settings,
  LogOut,
  MoreVertical,
} from 'lucide-react'
import { Button } from '@/components/ui'

interface HeaderProps {
  showSidebarToggle?: boolean
  onSidebarToggle?: () => void
  title?: string
  actions?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({
  showSidebarToggle = true,
  onSidebarToggle,
  title,
  actions,
}) => {
  const { darkMode, toggleDarkMode, sidebarOpen, toggleSidebar } = useUIStore()
  const [showUserMenu, setShowUserMenu] = useState(false)

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <header className="header-premium sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-4">
          {showSidebarToggle && (
            <button
              onClick={() => {
                toggleSidebar()
                onSidebarToggle?.()
              }}
              className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 rounded-xl transition-all duration-300 text-emerald-700 dark:text-emerald-400"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          )}
          {title && <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{title}</h1>}
        </div>

        <div className="flex items-center gap-3">
          {actions && <div className="hidden md:flex gap-2">{actions}</div>}

          {/* Notifications */}
          <button className="relative p-2.5 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 rounded-xl transition-all duration-300 text-emerald-600 dark:text-emerald-400">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg animate-pulse" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 rounded-xl transition-all duration-300 text-emerald-600 dark:text-emerald-400"
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-1.5 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 rounded-xl transition-all duration-300"
            >
              <div className="h-9 w-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                JD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">John Doe</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">Admin</p>
              </div>
              <MoreVertical className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-emerald-100 dark:border-emerald-900/30 py-2 z-50 backdrop-blur-sm">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <hr className="my-2 border-emerald-100 dark:border-emerald-900/30" />
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
