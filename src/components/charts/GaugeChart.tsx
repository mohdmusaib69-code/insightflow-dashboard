import React from 'react'

interface GaugeChartProps {
  value: number
  maxValue?: number
  title?: string
  unit?: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
  showPercentage?: boolean
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  maxValue = 100,
  title,
  unit = '%',
  color = '#0ea5e9',
  size = 'md',
  showPercentage = true,
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100)

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  }

  // SVG-based circular gauge
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>}
      <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
          {/* Text */}
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dy="0.3em"
            className="fill-gray-900 dark:fill-white font-bold text-xl"
          >
            {Math.round(percentage)}%
          </text>
        </svg>
      </div>
      <div className="mt-4 text-center">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{unit}</span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">out of {maxValue}</p>
      </div>
    </div>
  )
}
