import React from 'react'
import {
  DashboardLayout,
  Card,
  CardHeader,
  CardBody,
  DataTable,
  StatusBadge,
  Button,
} from '@/components'
import { mockUsers } from '@/data/mockData'
import { ColumnDef } from '@tanstack/react-table'
import { User } from '@/types'
import { Download, Mail, Phone } from 'lucide-react'
import { format } from 'date-fns'

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          {(info.getValue() as string)
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        {info.getValue<string>()}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => (
      <a
        href={`mailto:${info.getValue()}`}
        className="text-primary-600 dark:text-primary-400 hover:underline"
      >
        {info.getValue<string>()}
      </a>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'joinDate',
    header: 'Join Date',
    cell: (info) => format(new Date(info.getValue() as string), 'MMM dd, yyyy'),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => <StatusBadge status={info.getValue() as string} />,
  },
]

export const UsersPage: React.FC = () => {
  return (
    <DashboardLayout title="Users" showSidebar showHeader>
      <div className="space-y-6 animate-fade-in">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {mockUsers.length}
              </p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                {mockUsers.filter((u) => u.status === 'active').length}
              </p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                {mockUsers.filter((u) => u.status === 'pending').length}
              </p>
            </div>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader
            title="User Directory"
            action={
              <Button
                variant="secondary"
                size="sm"
                icon={<Download className="h-4 w-4" />}
              >
                Export
              </Button>
            }
          />
          <CardBody>
            <DataTable
              columns={columns}
              data={mockUsers}
              searchPlaceholder="Search users..."
              pageSize={10}
            />
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}
