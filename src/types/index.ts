import type { ReactNode } from 'react'

// Dashboard Types and Interfaces

export type DateRange = {
  start: Date
  end: Date
}

export type TimeRange = 'day' | 'week' | 'month' | 'quarter' | 'year'

export type Status = 'active' | 'inactive' | 'pending' | 'completed'

export interface MetricCard {
  id: string
  title: string
  value: number | string
  unit?: string
  change?: number
  isPositive?: boolean
  icon?: string
}

export interface ChartDataPoint {
  name?: string
  value?: number
  [key: string]: any
}

export interface RevenueData {
  month: string
  revenue: number
  target: number
  growth?: number
}

export interface UserGrowth {
  date: string
  users: number
  activeUsers: number
  newUsers: number
}

export interface TrafficSource {
  name: string
  value: number
  percentage?: number
}

export interface Product {
  id: string
  name: string
  category: string
  price: number
  sales: number
  revenue: number
  stock: number
  status: Status
  lastUpdated: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  joinDate: string
  status: Status
  avatar?: string
}

export interface Analytics {
  totalUsers: number
  totalRevenue: number
  conversionRate: number
  avgOrderValue: number
  customerRetention: number
  bounceRate: number
}

export interface FilterState {
  dateRange: DateRange
  category?: string
  status?: Status
  searchQuery?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ExportFormat {
  format: 'csv' | 'json' | 'pdf'
  includeCharts?: boolean
}

export interface NavigationItem {
  id: string
  label: string
  icon: ReactNode
  href: string
  badge?: number
}

export interface TooltipData {
  label: string
  value: number | string
  color?: string
}

export interface ChartConfig {
  id: string
  type: 'bar' | 'line' | 'pie' | 'area' | 'gauge'
  title: string
  data: ChartDataPoint[]
  colors?: string[]
  showLegend?: boolean
  showTooltip?: boolean
  showGrid?: boolean
}
