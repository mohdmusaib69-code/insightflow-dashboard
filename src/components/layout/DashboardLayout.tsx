import React from 'react'
import { useUIStore } from '@/store'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { NavigationItem } from '@/types'
import clsx from 'clsx'
import {
  BarChart3,
  Users,
  ShoppingCart,
  TrendingUp,
  Settings,
  FileText,
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
  showHeader?: boolean
  showSidebar?: boolean
  title?: string
}

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <BarChart3 className="h-5 w-5" />,
    href: '/dashboard',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <TrendingUp className="h-5 w-5" />,
    href: '/analytics',
  },
  {
    id: 'products',
    label: 'Products',
    icon: <ShoppingCart className="h-5 w-5" />,
    href: '/products',
    badge: 5,
  },
  {
    id: 'users',
    label: 'Users',
    icon: <Users className="h-5 w-5" />,
    href: '/users',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <FileText className="h-5 w-5" />,
    href: '/reports',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    href: '/settings',
  },
]

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  showHeader = true,
  showSidebar = true,
  title,
}) => {
  const { sidebarOpen } = useUIStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-900">
      {showSidebar && (
        <Sidebar
          items={navigationItems}
          logo={
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg-green">
                AD
              </div>
              {sidebarOpen && <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Dashboard</span>}
            </div>
          }
          footer={
            <div className="text-center text-xs text-emerald-600 dark:text-emerald-400 space-y-1">
              <p className="font-semibold">© 2024</p>
              <p className="text-emerald-500 dark:text-emerald-400">Analytics Suite</p>
            </div>
          }
        />
      )}

      <div
        className={clsx(
          'transition-all duration-300',
          showSidebar && (sidebarOpen ? 'ml-64' : 'ml-20'),
        )}
      >
        {showHeader && <Header title={title} showSidebarToggle={showSidebar} />}

        <main className="p-6 lg:p-8 max-w-7xl">
          {children}
        </main>
      </div>
    </div>
  )
}
