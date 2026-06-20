import React from 'react'
import clsx from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hoverable?: boolean
  interactive?: boolean
  premium?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, hoverable = false, interactive = false, premium = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          premium ? 'card-premium' : 'card',
          'p-6 lg:p-8',
          hoverable && 'card-hover',
          interactive && 'cursor-pointer',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  className,
  children,
  ...props
}) => {
  return (
    <div className={clsx('mb-5 flex items-start justify-between', className)} {...props}>
      <div>
        {title && <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{title}</h3>}
        {subtitle && <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
      </div>
      {action && <div className="ml-4 flex-shrink-0">{action}</div>}
      {children}
    </div>
  )
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className, ...props }) => {
  return (
    <div className={clsx('', className)} {...props}>
      {children}
    </div>
  )
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className, ...props }) => {
  return (
    <div className={clsx('mt-6 flex items-center justify-between border-t border-emerald-100 dark:border-emerald-900/30 pt-6', className)} {...props}>
      {children}
    </div>
  )
}
