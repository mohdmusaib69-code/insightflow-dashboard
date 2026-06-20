import React from 'react'

interface ProgressGaugeProps {
  value: number
  target: number
  title?: string
  color?: string
  showLabel?: boolean
}

export const ProgressGauge: React.FC<ProgressGaugeProps> = ({
  value,
  target,
  title,
  color = '#0ea5e9',
  showLabel = true,
}) => {
  const percentage = Math.min((value / target) * 100, 100)

  return (
    <div className="w-full">
      {title && <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{title}</p>}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${percentage}%`, backgroundColor: color }}
            />
          </div>
        </div>
        {showLabel && (
          <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-fit">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  )
}
