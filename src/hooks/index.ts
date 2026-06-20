import { useCallback, useEffect, useState } from 'react'
import { useFilterStore } from '@/store'
import { debounce } from '@/utils/formatting'

/**
 * Hook for managing search functionality with debouncing
 */
export const useSearch = (defaultValue = '') => {
  const [searchTerm, setSearchTerm] = useState(defaultValue)
  const { setSearchQuery } = useFilterStore()

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value || undefined)
    }, 300),
    [setSearchQuery],
  )

  useEffect(() => {
    handleSearch(searchTerm)
  }, [searchTerm, handleSearch])

  return { searchTerm, setSearchTerm }
}

/**
 * Hook for loading state management
 */
export const useLoading = (initialState = false) => {
  const [loading, setLoading] = useState(initialState)

  const withLoading = useCallback(
    async <T,>(fn: () => Promise<T>): Promise<T> => {
      setLoading(true)
      try {
        return await fn()
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return { loading, setLoading, withLoading }
}

/**
 * Hook for pagination
 */
export const usePagination = (items: any[], pageSize = 10) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(items.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentItems = items.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    const pageNum = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(pageNum)
  }

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1),
  }
}

/**
 * Hook for data fetching with error handling
 */
export const useFetch = <T,>(
  url: string,
  options?: RequestInit,
): {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
} => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url, options)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }, [url, options])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

/**
 * Hook for local storage persistence
 */
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(error)
      }
    },
    [key, storedValue],
  )

  return [storedValue, setValue] as const
}

/**
 * Hook for window resize events
 */
export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, 150)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

/**
 * Hook for keyboard shortcuts
 */
export const useKeyboardShortcut = (key: string, callback: () => void, ctrlKey = true) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key && event.ctrlKey === ctrlKey) {
        event.preventDefault()
        callback()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [key, callback, ctrlKey])
}
