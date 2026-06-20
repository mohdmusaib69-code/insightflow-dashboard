import React from 'react'
import clsx from 'clsx'

export const Skeleton: React.FC<{
  className?: string
  count?: number
}> = ({ className, count = 1 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            'bg-gradient-to-r from-emerald-200 to-teal-200 dark:from-emerald-900/40 dark:to-teal-900/40 rounded-xl animate-pulse',
            className || 'h-4 w-full',
          )}
        />
      ))}
    </div>
  )
}

export const SkeletonRow: React.FC<{
  columns?: number
}> = ({ columns = 5 }) => {
  return (
    <div className="flex gap-4">
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="flex-1">
          <Skeleton className="h-10" />
        </div>
      ))}
    </div>
  )
}

export const LoadingSpinner: React.FC<{
  size?: 'sm' | 'md' | 'lg'
}> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx(
          'animate-spin rounded-full border-3 border-emerald-200 dark:border-emerald-900/40 border-t-emerald-600 dark:border-t-emerald-400 shadow-lg-green',
          sizeClasses[size],
        )}
      />
    </div>
  )
}

export const EmptyState: React.FC<{
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}> = ({ icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && <div className="mb-4 text-emerald-300 dark:text-emerald-700">{icon}</div>}
      <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export const ErrorState: React.FC<{
  title?: string
  message: string
  retry?: () => void
}> = ({ title = 'Error', message, retry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-5 inline-flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/40 dark:to-pink-900/40 shadow-lg-green">
        <svg
          className="h-7 w-7 text-red-600 dark:text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-red-700 dark:text-red-300">{title}</h3>
      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="mt-6 px-6 py-2.5 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg-green hover:shadow-xl-green"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
