import React, { useState } from 'react'
import {
  DashboardLayout,
  Card,
  CardHeader,
  CardBody,
  BarChart,
  LineChart,
  PieChart,
  AreaChart,
  Button,
} from '@/components'
import {
  mockRevenueData,
  mockUserGrowthData,
  mockTrafficSources,
  mockAnalytics,
  mockActiveUsersData,
  mockMonthlyComparisonData,
} from '@/data/mockData'
import { useFilterStore } from '@/store'
import { formatCurrency, formatNumber, formatPercent } from '@/utils/formatting'
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { format } from 'date-fns'

export const DashboardPage: React.FC = () => {
  const { filters } = useFilterStore()
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month')

  const metrics = [
    {
      title: 'Total Users',
      value: mockAnalytics.totalUsers,
      icon: Users,
      change: 12.5,
      unit: 'users',
    },
    {
      title: 'Total Revenue',
      value: mockAnalytics.totalRevenue,
      icon: DollarSign,
      change: 8.2,
      unit: 'USD',
      formatter: formatCurrency,
    },
    {
      title: 'Conversion Rate',
      value: mockAnalytics.conversionRate,
      icon: TrendingUp,
      change: 2.1,
      unit: '%',
      formatter: (v: number) => formatPercent(v),
    },
    {
      title: 'Avg Order Value',
      value: mockAnalytics.avgOrderValue,
      icon: ShoppingCart,
      change: -1.5,
      unit: 'USD',
      formatter: formatCurrency,
    },
  ]

  return (
    <DashboardLayout title="Dashboard" showSidebar showHeader>
      <div className="space-y-6 animate-fade-in">
        {/* Date Range Selector */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            {(['week', 'month', 'quarter', 'year'] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {format(filters.dateRange.start, 'MMM dd')} - {format(filters.dateRange.end, 'MMM dd, yyyy')}
          </span>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            const formatter = metric.formatter || formatNumber
            return (
              <Card key={index} premium className="metric-card animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2">{metric.title}</p>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-900 to-teal-900 dark:from-emerald-300 dark:to-teal-300 bg-clip-text text-transparent">
                      {formatter(metric.value as number)}
                    </h3>
                    <div className="mt-3 flex items-center gap-2">
                      {metric.change > 0 ? (
                        <>
                          <ArrowUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400 font-bold" />
                          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            +{metric.change}%
                          </span>
                        </>
                      ) : (
                        <>
                          <ArrowDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                          <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                            {metric.change}%
                          </span>
                        </>
                      )}
                      <span className="text-xs text-emerald-500 dark:text-emerald-400">vs last period</span>
                    </div>
                  </div>
                  <div className="ml-4 p-3 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 rounded-2xl shadow-sm-green">
                    <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="chart-container animate-slide-in" style={{ animationDelay: '200ms' }}>
            <CardHeader title="Monthly Revenue" />
            <CardBody>
              <BarChart
                data={mockRevenueData}
                dataKeys={['revenue', 'target']}
                colors={['#22c55e', '#0ea5e9']}
                height={300}
              />
            </CardBody>
          </Card>

          {/* Traffic Sources */}
          <Card className="chart-container animate-slide-in" style={{ animationDelay: '300ms' }}>
            <CardHeader title="Traffic Sources" />
            <CardBody>
              <PieChart
                data={mockTrafficSources}
                height={300}
                nameKey="name"
                dataKey="value"
              />
            </CardBody>
          </Card>

          {/* User Growth */}
          <Card className="chart-container animate-slide-in" style={{ animationDelay: '400ms' }}>
            <CardHeader title="User Growth Trend" />
            <CardBody>
              <LineChart
                data={mockUserGrowthData}
                dataKeys={['users', 'activeUsers']}
                colors={['#22c55e', '#10b981']}
                height={300}
                xAxisKey="date"
              />
            </CardBody>
          </Card>

          {/* Active Users */}
          <Card className="chart-container animate-slide-in" style={{ animationDelay: '500ms' }}>
            <CardHeader title="Active Users (24h)" />
            <CardBody>
              <AreaChart
                data={mockActiveUsersData}
                dataKeys={['users']}
                xAxisKey="time"
                height={300}
                stacked={false}
              />
            </CardBody>
          </Card>

          {/* Monthly Comparison */}
          <Card className="animate-slide-in lg:col-span-2" style={{ animationDelay: '600ms' }}>
            <CardHeader title="Year-over-Year Comparison" />
            <CardBody>
              <LineChart
                data={mockMonthlyComparisonData}
                dataKeys={['thisYear', 'lastYear']}
                colors={['#0ea5e9', '#cbd5e1']}
                height={350}
                xAxisKey="name"
              />
            </CardBody>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="animate-slide-in" style={{ animationDelay: '700ms' }}>
            <CardHeader title="Customer Retention" />
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatPercent(mockAnalytics.customerRetention)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    +2.3% increase
                  </p>
                </div>
                <div className="h-16 w-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {Math.round(mockAnalytics.customerRetention)}%
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="animate-slide-in" style={{ animationDelay: '800ms' }}>
            <CardHeader title="Bounce Rate" />
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatPercent(mockAnalytics.bounceRate)}
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    -1.2% decrease (good)
                  </p>
                </div>
                <div className="h-16 w-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {Math.round(mockAnalytics.bounceRate)}%
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="animate-slide-in" style={{ animationDelay: '900ms' }}>
            <CardHeader title="Performance" />
            <CardBody>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Page Load Time</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">1.2s</p>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">API Response</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">0.8s</p>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
