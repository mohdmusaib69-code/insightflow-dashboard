import {
  RevenueData,
  UserGrowth,
  TrafficSource,
  Product,
  User,
  Analytics,
  ChartDataPoint,
  Status,
} from '@/types'
import { format, subDays } from 'date-fns'

// Mock Revenue Data
export const mockRevenueData: RevenueData[] = [
  { month: 'Jan', revenue: 4000, target: 4500, growth: 12 },
  { month: 'Feb', revenue: 3000, target: 4500, growth: -25 },
  { month: 'Mar', revenue: 2000, target: 4500, growth: 33 },
  { month: 'Apr', revenue: 2780, target: 4500, growth: 39 },
  { month: 'May', revenue: 1890, target: 4500, growth: -12 },
  { month: 'Jun', revenue: 2390, target: 4500, growth: 26 },
  { month: 'Jul', revenue: 3490, target: 4500, growth: 46 },
  { month: 'Aug', revenue: 4100, target: 4500, growth: 17 },
  { month: 'Sep', revenue: 3200, target: 4500, growth: -22 },
  { month: 'Oct', revenue: 4800, target: 4500, growth: 50 },
  { month: 'Nov', revenue: 5200, target: 4500, growth: 8 },
  { month: 'Dec', revenue: 6100, target: 4500, growth: 17 },
]

// Mock User Growth Data
export const mockUserGrowthData: UserGrowth[] = Array.from({ length: 30 }, (_, i) => {
  const date = subDays(new Date(), 29 - i)
  return {
    date: format(date, 'MMM dd'),
    users: Math.floor(Math.random() * 2000) + 8000,
    activeUsers: Math.floor(Math.random() * 1500) + 5000,
    newUsers: Math.floor(Math.random() * 300) + 100,
  }
})

// Mock Traffic Sources
export const mockTrafficSources: TrafficSource[] = [
  { name: 'Direct', value: 45, percentage: 32 },
  { name: 'Organic', value: 55, percentage: 39 },
  { name: 'Referral', value: 25, percentage: 18 },
  { name: 'Social', value: 15, percentage: 11 },
]

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Dashboard',
    category: 'Software',
    price: 299,
    sales: 1200,
    revenue: 358800,
    stock: 450,
    status: 'active',
    lastUpdated: '2024-01-15',
  },
  {
    id: '2',
    name: 'Analytics Suite',
    category: 'Software',
    price: 499,
    sales: 850,
    revenue: 424150,
    stock: 320,
    status: 'active',
    lastUpdated: '2024-01-14',
  },
  {
    id: '3',
    name: 'Data Export Tool',
    category: 'Tools',
    price: 99,
    sales: 2500,
    revenue: 247500,
    stock: 0,
    status: 'pending',
    lastUpdated: '2024-01-13',
  },
  {
    id: '4',
    name: 'Real-time Monitoring',
    category: 'Services',
    price: 199,
    sales: 560,
    revenue: 111440,
    stock: 200,
    status: 'active',
    lastUpdated: '2024-01-12',
  },
  {
    id: '5',
    name: 'API Integration',
    category: 'Services',
    price: 149,
    sales: 1800,
    revenue: 268200,
    stock: 600,
    status: 'active',
    lastUpdated: '2024-01-11',
  },
  {
    id: '6',
    name: 'Legacy System',
    category: 'Software',
    price: 59,
    sales: 150,
    revenue: 8850,
    stock: 50,
    status: 'inactive',
    lastUpdated: '2024-01-10',
  },
]

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'Product Manager',
    department: 'Product',
    joinDate: '2023-01-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'Senior Developer',
    department: 'Engineering',
    joinDate: '2022-06-20',
    status: 'active',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    role: 'Data Analyst',
    department: 'Analytics',
    joinDate: '2023-03-10',
    status: 'active',
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    role: 'UX Designer',
    department: 'Design',
    joinDate: '2023-07-01',
    status: 'active',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    role: 'Marketing Manager',
    department: 'Marketing',
    joinDate: '2023-02-14',
    status: 'pending',
  },
  {
    id: '6',
    name: 'David Thompson',
    email: 'david.thompson@example.com',
    role: 'Junior Developer',
    department: 'Engineering',
    joinDate: '2023-11-01',
    status: 'active',
  },
]

// Mock Analytics Summary
export const mockAnalytics: Analytics = {
  totalUsers: 12450,
  totalRevenue: 1418600,
  conversionRate: 3.8,
  avgOrderValue: 245.5,
  customerRetention: 87.3,
  bounceRate: 42.5,
}

// Active Users Over Time
export const mockActiveUsersData: ChartDataPoint[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  users: Math.floor(Math.random() * 3000) + 2000,
  sessions: Math.floor(Math.random() * 1500) + 1000,
}))

// Goal Completion Data
export const mockGoalCompletionData = [
  { goal: 'Q1 Sales Target', value: 75, target: 100, color: '#0ea5e9' },
  { goal: 'Marketing Reach', value: 85, target: 100, color: '#8b5cf6' },
  { goal: 'Customer Satisfaction', value: 92, target: 100, color: '#10b981' },
  { goal: 'Product Development', value: 60, target: 100, color: '#f59e0b' },
]

// Conversion Funnel Data
export const mockConversionFunnelData: ChartDataPoint[] = [
  { name: 'Visitors', value: 100000 },
  { name: 'Leads', value: 45000 },
  { name: 'Opportunities', value: 15000 },
  { name: 'Customers', value: 3800 },
  { name: 'Advocates', value: 950 },
]

// Monthly Comparison Data
export const mockMonthlyComparisonData: ChartDataPoint[] = [
  { name: 'Jan', thisYear: 4000, lastYear: 3500 },
  { name: 'Feb', thisYear: 3000, lastYear: 3200 },
  { name: 'Mar', thisYear: 2000, lastYear: 2500 },
  { name: 'Apr', thisYear: 2780, lastYear: 2800 },
  { name: 'May', thisYear: 1890, lastYear: 2100 },
  { name: 'Jun', thisYear: 2390, lastYear: 2000 },
  { name: 'Jul', thisYear: 3490, lastYear: 3100 },
  { name: 'Aug', thisYear: 4100, lastYear: 3900 },
  { name: 'Sep', thisYear: 3200, lastYear: 2800 },
  { name: 'Oct', thisYear: 4800, lastYear: 4200 },
  { name: 'Nov', thisYear: 5200, lastYear: 4800 },
  { name: 'Dec', thisYear: 6100, lastYear: 5500 },
]

// Customer Satisfaction Trend
export const mockSatisfactionData: ChartDataPoint[] = [
  { week: 'Week 1', score: 75, target: 85 },
  { week: 'Week 2', score: 78, target: 85 },
  { week: 'Week 3', score: 82, target: 85 },
  { week: 'Week 4', score: 88, target: 85 },
  { week: 'Week 5', score: 85, target: 85 },
  { week: 'Week 6', score: 90, target: 85 },
]

export const generateMockProducts = (count: number): Product[] => {
  const statuses: Status[] = ['active', 'inactive', 'pending']

  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: `Product ${i + 1}`,
    category: ['Software', 'Hardware', 'Services'][Math.floor(Math.random() * 3)],
    price: Math.floor(Math.random() * 500) + 50,
    sales: Math.floor(Math.random() * 3000) + 100,
    revenue: Math.floor(Math.random() * 500000) + 50000,
    stock: Math.floor(Math.random() * 1000),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastUpdated: format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd'),
  }))
}
