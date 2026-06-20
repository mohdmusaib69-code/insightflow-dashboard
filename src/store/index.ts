import { create } from 'zustand'
import { DateRange, FilterState, Status } from '@/types'
import { subDays } from 'date-fns'

export interface UIState {
  darkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (isDark: boolean) => void
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (isOpen: boolean) => void
}

export interface FilterStore {
  filters: FilterState
  setDateRange: (range: DateRange) => void
  setCategory: (category: string | undefined) => void
  setStatus: (status: Status | undefined) => void
  setSearchQuery: (query: string | undefined) => void
  setSortBy: (sortBy: string | undefined) => void
  setSortOrder: (order: 'asc' | 'desc' | undefined) => void
  resetFilters: () => void
}

export interface AnalyticsStore {
  loading: boolean
  error: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

const defaultDateRange: DateRange = {
  start: subDays(new Date(), 30),
  end: new Date(),
}

const defaultFilters: FilterState = {
  dateRange: defaultDateRange,
  sortBy: undefined,
  sortOrder: 'desc',
}

// UI Store
export const useUIStore = create<UIState>((set) => ({
  darkMode: localStorage.getItem('darkMode') === 'true',
  toggleDarkMode: () =>
    set((state) => {
      const newValue = !state.darkMode
      localStorage.setItem('darkMode', String(newValue))
      return { darkMode: newValue }
    }),
  setDarkMode: (isDark) => {
    localStorage.setItem('darkMode', String(isDark))
    set({ darkMode: isDark })
  },
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
}))

// Filter Store
export const useFilterStore = create<FilterStore>((set) => ({
  filters: defaultFilters,
  setDateRange: (range) =>
    set((state) => ({
      filters: { ...state.filters, dateRange: range },
    })),
  setCategory: (category) =>
    set((state) => ({
      filters: { ...state.filters, category },
    })),
  setStatus: (status) =>
    set((state) => ({
      filters: { ...state.filters, status },
    })),
  setSearchQuery: (searchQuery) =>
    set((state) => ({
      filters: { ...state.filters, searchQuery },
    })),
  setSortBy: (sortBy) =>
    set((state) => ({
      filters: { ...state.filters, sortBy },
    })),
  setSortOrder: (sortOrder) =>
    set((state) => ({
      filters: { ...state.filters, sortOrder },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
}))

// Analytics Store
export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  loading: false,
  error: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))
