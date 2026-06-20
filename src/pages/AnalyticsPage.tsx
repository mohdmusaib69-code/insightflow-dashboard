import React, { useState } from 'react'
import {
  DashboardLayout,
  Card,
  CardHeader,
  CardBody,
  LineChart,
  BarChart,
  AreaChart,
  ProgressGauge,
  Button,
} from '@/components'
import {
  mockMonthlyComparisonData,
  mockConversionFunnelData,
  mockSatisfactionData,
  mockGoalCompletionData,
} from '@/data/mockData'
import { useFilterStore } from '@/store'
import { Select } from '@/components/ui'
import { Calendar, Download } from 'lucide-react'

export const AnalyticsPage: React.FC = () => {
  const { filters } = useFilterStore()
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const metricOptions = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'users', label: 'Users' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'conversion', label: 'Conversion' },
  ]

  return (
    <DashboardLayout title="Analytics" showSidebar showHeader>
      <div className="space-y-6 animate-fade-in">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-4">
            <Select
              label="Metric"
              options={metricOptions}
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="w-56"
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={<Download className="h-4 w-4" />}
          >
            Export Report
          </Button>
        </div>

        {/* Main Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* YoY Comparison */}
          <Card className="chart-container lg:col-span-2">
            <CardHeader title="Year-over-Year Performance" />
            <CardBody>
              <LineChart
                data={mockMonthlyComparisonData}
                dataKeys={['thisYear', 'lastYear']}
                colors={['#22c55e', '#d1d5db']}
                height={350}
                xAxisKey="name"
              />
            </CardBody>
          </Card>

          {/* Conversion Funnel */}
          <Card className="chart-container">
            <CardHeader title="Conversion Funnel" />
            <CardBody>
              <BarChart
                data={mockConversionFunnelData}
                dataKeys={['value']}
                colors={['#22c55e']}
                height={300}
                xAxisKey="name"
              />
            </CardBody>
          </Card>

          {/* Customer Satisfaction */}
          <Card className="chart-container">
            <CardHeader title="Customer Satisfaction Trend" />
            <CardBody>
              <LineChart
                data={mockSatisfactionData}
                dataKeys={['score', 'target']}
                colors={['#10b981', '#06b6d4']}
                height={300}
                xAxisKey="week"
              />
            </CardBody>
          </Card>
        </div>

        {/* Goal Completion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Q1 Sales Target" />
            <CardBody>
              <div className="space-y-4">
                <ProgressGauge
                  value={75}
                  target={100}
                  title="Current Progress"
                  color="#0ea5e9"
                />
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>Target: $100,000</p>
                  <p>Current: $75,000</p>
                  <p className="mt-2 font-medium text-gray-900 dark:text-white">
                    Remaining: $25,000
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Multiple Goals" />
            <CardBody>
              <div className="space-y-4">
                {mockGoalCompletionData.map((goal, index) => (
                  <ProgressGauge
                    key={index}
                    value={goal.value}
                    target={goal.target}
                    title={goal.goal}
                    color={goal.color}
                  />
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Key Insights */}
        <Card>
          <CardHeader title="Key Insights & Recommendations" />
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Positive Trend</h4>
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  User engagement is up 23% compared to last month. This indicates successful campaign execution.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">Action Required</h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-400">
                  Conversion rate dropped 2.1%. Review checkout process and optimize conversion funnel.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">Opportunity</h4>
                <p className="text-sm text-green-800 dark:text-green-400">
                  Mobile traffic is 40% of total. Consider mobile-first optimization to capture more users.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">Recommendation</h4>
                <p className="text-sm text-purple-800 dark:text-purple-400">
                  Segment users by behavior and create personalized campaigns for better engagement.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}
