import React from 'react'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { ChartDataPoint } from '@/types'
import clsx from 'clsx'

interface BarChartProps {
  data: ChartDataPoint[]
  title?: string
  colors?: string[]
  showLegend?: boolean
  showGrid?: boolean
  dataKeys: string[]
  xAxisKey?: string
  height?: number
  loading?: boolean
  onClick?: (data: any) => void
}

export const BarChart: React.FC<BarChartProps> = ({
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
}) => {
  if (loading) {
    return <div className="h-80 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
  }

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} onClick={onClick}>
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
            <Bar key={key} dataKey={key} fill={colors[index % colors.length]} radius={[8, 8, 0, 0]} />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
