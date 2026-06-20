import React from 'react'
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChartDataPoint } from '@/types'

interface PieChartProps {
  data: ChartDataPoint[]
  title?: string
  colors?: string[]
  dataKey?: string
  nameKey?: string
  height?: number
  loading?: boolean
  onClick?: (data: any) => void
  showLegend?: boolean
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  title,
  colors = ['#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
  dataKey = 'value',
  nameKey = 'name',
  height = 300,
  loading = false,
  onClick,
  showLegend = true,
}) => {
  if (loading) {
    return <div className="h-80 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
  }

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart onClick={onClick}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey={dataKey}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#fff',
            }}
          />
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}
