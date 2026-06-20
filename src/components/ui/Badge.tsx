import React from 'react'
import clsx from 'clsx'
import { Status } from '@/types'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
  children: React.ReactNode
  icon?: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className,
  ...props
}) => {
  const variantClasses = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 text-blue-700 dark:text-blue-300 shadow-sm-green',
  }

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-1.5 text-sm',
  }

  return (
    <div
      className={clsx(
        'badge inline-flex items-center gap-1.5 rounded-full font-semibold',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </div>
  )
}

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: Status | string
  icon?: React.ReactNode
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, icon, className, ...props }) => {
  const statusClasses: Record<string, string> = {
    active: 'status-active',
    inactive: 'status-inactive',
    pending: 'status-pending',
    completed: 'bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/50 shadow-sm',
  }

  const statusLabels: Record<string, string> = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    completed: 'Completed',
  }

  const statusDots: Record<string, string> = {
    active: 'bg-emerald-500 shadow-lg',
    inactive: 'bg-gray-500 shadow-lg',
    pending: 'bg-amber-500 shadow-lg',
    completed: 'bg-cyan-500 shadow-lg',
  }

  return (
    <div className={clsx('status-badge', statusClasses[status], className)} {...props}>
      <span className={clsx('h-2.5 w-2.5 rounded-full flex-shrink-0', statusDots[status])} />
      {icon}
      {statusLabels[status] || status}
    </div>
  )
}

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  onRemove?: () => void
}

export const Tag: React.FC<TagProps> = ({ children, onRemove, className, ...props }) => {
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium shadow-sm-green',
        className,
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-800/60 transition-colors"
        >
          ×
        </button>
      )}
    </div>
  )
}
