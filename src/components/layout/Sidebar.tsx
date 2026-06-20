import React from 'react'
import { useUIStore } from '@/store'
import { NavigationItem } from '@/types'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

interface SidebarProps {
  items: NavigationItem[]
  logo?: React.ReactNode
  footer?: React.ReactNode
}

export const Sidebar: React.FC<SidebarProps> = ({ items, logo, footer }) => {
  const { sidebarOpen } = useUIStore()
  const location = useLocation()

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 bottom-0 z-40 bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-slate-900 border-r border-emerald-100 dark:border-emerald-900/30 transition-all duration-300 shadow-lg-green',
        sidebarOpen ? 'w-64' : 'w-20',
        'flex flex-col',
      )}
    >
      {/* Logo */}
      {logo && (
        <div className={clsx('border-b border-emerald-100 dark:border-emerald-900/30 p-4 lg:p-5', 'flex items-center justify-center')}>
          <div className={clsx(sidebarOpen && 'w-full')}>{logo}</div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2.5">
        {items.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.id}
              to={item.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group',
                isActive
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg-green scale-105'
                  : 'text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 hover:text-emerald-800 dark:hover:text-emerald-200',
              )}
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>
              {sidebarOpen && (
                <>
                  <span className="flex-1 truncate font-semibold text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto inline-flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold shadow-md">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {footer && sidebarOpen && (
        <div className="border-t border-emerald-100 dark:border-emerald-900/30 p-4 lg:p-5">
          {footer}
        </div>
      )}
    </aside>
  )
}
