import React from 'react'
import { DashboardLayout, Card, Button } from '@/components'
import { Download, Share2, Eye } from 'lucide-react'

interface Report {
  id: string
  name: string
  description: string
  createdDate: string
  type: string
}

export const ReportsPage: React.FC = () => {
  const reports: Report[] = [
    {
      id: '1',
      name: 'Monthly Sales Report',
      description: 'Complete overview of monthly sales performance',
      createdDate: '2024-01-15',
      type: 'Sales',
    },
    {
      id: '2',
      name: 'Customer Analysis',
      description: 'Detailed customer segmentation and behavior analysis',
      createdDate: '2024-01-14',
      type: 'Customer',
    },
    {
      id: '3',
      name: 'Product Performance',
      description: 'Analysis of all products and their market performance',
      createdDate: '2024-01-12',
      type: 'Product',
    },
    {
      id: '4',
      name: 'Revenue Forecast',
      description: 'Q1 revenue projections and trend analysis',
      createdDate: '2024-01-10',
      type: 'Financial',
    },
  ]

  return (
    <DashboardLayout title="Reports" showSidebar showHeader>
      <div className="space-y-6 animate-fade-in">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {reports.length}
              </p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                4
              </p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Shared</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                12
              </p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Downloaded</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                24
              </p>
            </div>
          </Card>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} interactive>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{report.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {report.description}
                  </p>
                  <div className="flex gap-4 mt-3">
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {report.type}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {report.createdDate}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Eye className="h-4 w-4" />}
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Download className="h-4 w-4" />}
                  >
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Share2 className="h-4 w-4" />}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
