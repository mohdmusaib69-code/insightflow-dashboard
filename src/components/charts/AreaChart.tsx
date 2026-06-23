import React from 'react'
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { ChartDataPoint } from '@/types'

interface AreaChartProps {
  data: ChartDataPoint[]
  title?: string
  colors?: string[]
  showLegend?: boolean
  showGrid?: boolean
  dataKeys: string[]
  xAxisKey?: string
  height?: number
  loading?: boolean
  onClick?: (data: unknown) => void
  stacked?: boolean
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  title,
  colors = ['#0ea5e9', '#8b5cf6'],
  showLegend = true,
  showGrid = true,
  dataKeys,
  xAxisKey = 'name',
  height = 300,
  loading = false,
  onClick,
  stacked = true,
}) => {
  if (loading) {
    return <div className="h-80 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
  }

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} onClick={onClick}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          <XAxis dataKey={xAxisKey} stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#fff',
            }}
            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
          />
          {showLegend && <Legend />}
          {dataKeys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              fill={colors[index % colors.length]}
              stroke={colors[index % colors.length]}
              stackId={stacked ? 'stack' : undefined}
              fillOpacity={0.7}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}
