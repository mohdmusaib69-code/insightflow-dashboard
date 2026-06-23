import React, { useMemo } from 'react'
import {
  DashboardLayout,
  Card,
  CardHeader,
  CardBody,
  DataTable,
  Badge,
  StatusBadge,
  Button,
} from '@/components'
import { mockProducts } from '@/data/mockData'
import { useFilterStore } from '@/store'
import { formatCurrency, exportToCSV, exportToJSON } from '@/utils/formatting'
import { ColumnDef } from '@tanstack/react-table'
import { Product } from '@/types'
import { Download } from 'lucide-react'

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Product Name',
    cell: (info) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md-green">
          {info.getValue<string>().charAt(0)}
        </div>
        <span className="font-medium text-emerald-900 dark:text-emerald-300">{info.getValue<string>()}</span>
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: (info) => (
      <Badge variant="secondary" size="sm">
        {info.getValue() as string}
      </Badge>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (info) => <span className="font-semibold text-emerald-700 dark:text-emerald-300">{formatCurrency(info.getValue() as number)}</span>,
  },
  {
    accessorKey: 'sales',
    header: 'Sales',
    cell: (info) => <span className="font-medium">{(info.getValue() as number).toLocaleString()}</span>,
  },
  {
    accessorKey: 'revenue',
    header: 'Revenue',
    cell: (info) => (
      <span className="font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
        {formatCurrency(info.getValue() as number)}
      </span>
    ),
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: (info) => {
      const stock = info.getValue() as number
      const color = stock > 500 ? 'success' : stock > 100 ? 'warning' : 'danger'
      return (
        <Badge variant={color} size="sm">
          {stock}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => <StatusBadge status={info.getValue() as string} />,
  },
]

export const ProductsPage: React.FC = () => {
  const { filters } = useFilterStore()

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Filter by status if set
      if (filters.status && product.status !== filters.status) {
        return false
      }
      // Filter by category if set
      if (filters.category && product.category !== filters.category) {
        return false
      }
      // Filter by search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        return (
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        )
      }
      return true
    })
  }, [filters])

  const handleExport = (format: 'csv' | 'json') => {
    if (format === 'csv') {
      exportToCSV(filteredProducts, 'products-export.csv')
    } else {
      exportToJSON(filteredProducts, 'products-export.json')
    }
  }

  const totalRevenue = filteredProducts.reduce((sum, p) => sum + p.revenue, 0)
  const totalSales = filteredProducts.reduce((sum, p) => sum + p.sales, 0)

  return (
    <DashboardLayout title="Products" showSidebar showHeader>
      <div className="space-y-6 animate-fade-in">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {filteredProducts.length}
              </p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {totalSales.toLocaleString()}
              </p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Price</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {formatCurrency(filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length || 0)}
              </p>
            </div>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader
            title="Products"
            action={
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Download className="h-4 w-4" />}
                  onClick={() => handleExport('csv')}
                >
                  CSV
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Download className="h-4 w-4" />}
                  onClick={() => handleExport('json')}
                >
                  JSON
                </Button>
              </div>
            }
          />
          <CardBody>
            <DataTable
              columns={columns}
              data={filteredProducts}
              searchPlaceholder="Search products..."
              pageSize={10}
            />
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}
