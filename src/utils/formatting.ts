import { format, differenceInDays } from 'date-fns'
import { DateRange } from '@/types'

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export const formatNumber = (value: number, decimals = 0): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export const formatPercent = (value: number, decimals = 1): string => {
  return `${value.toFixed(decimals)}%`
}

export const formatDate = (date: Date, formatStr = 'MMM dd, yyyy'): string => {
  return format(date, formatStr)
}

export const formatDateRange = (range: DateRange): string => {
  const days = differenceInDays(range.end, range.start)
  if (days === 0) return format(range.start, 'MMM dd, yyyy')
  return `${format(range.start, 'MMM dd')} - ${format(range.end, 'MMM dd, yyyy')}`
}

export const formatCompactNumber = (value: number): string => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
  return String(value)
}

export const getChangeColor = (change: number): string => {
  if (change === 0) return 'text-gray-500'
  return change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
}

export const getStatusColor = (
  status: string,
): {
  bg: string
  text: string
} => {
  const colors: Record<string, { bg: string; text: string }> = {
    active: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-700 dark:text-green-400',
    },
    inactive: {
      bg: 'bg-gray-50 dark:bg-gray-900/20',
      text: 'text-gray-700 dark:text-gray-400',
    },
    pending: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-700 dark:text-yellow-400',
    },
    completed: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-700 dark:text-blue-400',
    },
  }
  return colors[status] || colors.inactive
}

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const generateColor = (index: number): string => {
  const colors = [
    '#0ea5e9', // sky
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#f59e0b', // amber
    '#10b981', // emerald
    '#06b6d4', // cyan
    '#6366f1', // indigo
    '#ef4444', // red
  ]
  return colors[index % colors.length]
}

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const debounce = <TArgs extends unknown[]>(
  func: (...args: TArgs) => void,
  wait: number,
): ((...args: TArgs) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: TArgs) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const groupByProperty = <T, K extends keyof T>(
  arr: T[],
  property: K,
): Map<T[K], T[]> => {
  return arr.reduce(
    (map, item) => {
      const key = item[property]
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(item)
      return map
    },
    new Map<T[K], T[]>(),
  )
}

export const exportToCSV = <T extends object>(
  data: T[],
  filename = 'export.csv',
): void => {
  if (!data || data.length === 0) return

  const headers = Object.keys(data[0]) as Array<keyof T>
  const rows = data.map((item) =>
    headers.map((header) => {
      const value = item[header]
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`
      }
      return value
    }),
  )

  const csv = [
    headers.map(String).join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const exportToJSON = <T>(
  data: T[],
  filename = 'export.json',
): void => {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
