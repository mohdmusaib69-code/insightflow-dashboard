# Project Structure

## Directory Overview

```
analytics-dashboard/
├── 📁 src/                       # Source code
│   ├── 📁 components/            # Reusable components
│   │   ├── 📁 ui/               # Base UI components
│   │   ├── 📁 layout/           # Layout components
│   │   ├── 📁 charts/           # Chart components
│   │   ├── 📁 tables/           # Table components
│   │   └── index.ts             # Component exports
│   ├── 📁 pages/                # Page components
│   ├── 📁 store/                # Zustand stores
│   ├── 📁 types/                # TypeScript interfaces
│   ├── 📁 data/                 # Mock data
│   ├── 📁 utils/                # Utility functions
│   ├── 📁 hooks/                # Custom React hooks
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # React entry point
│   └── index.css                # Global styles
├── 📁 public/                    # Static assets
├── 📄 index.html                # HTML template
├── 📄 package.json              # Dependencies
├── 📄 tsconfig.json             # TypeScript config
├── 📄 tailwind.config.js        # Tailwind CSS config
├── 📄 postcss.config.js         # PostCSS config
├── 📄 vite.config.ts            # Vite config
├── 📄 .eslintrc.json            # ESLint config
├── 📄 .prettierrc.json          # Prettier config
├── 📄 .gitignore                # Git ignore rules
├── 📄 README.md                 # Project overview
├── 📄 QUICKSTART.md             # Quick start guide
├── 📄 FEATURES.md               # Feature list
├── 📄 DEVELOPMENT_GUIDE.md      # Development help
└── 📄 DEPLOYMENT_GUIDE.md       # Deployment help
```

## Detailed Structure

### `/src/components/`

The component directory is organized by type for easy navigation and reusability.

#### `/src/components/ui/` - Base UI Components

```
ui/
├── Button.tsx              # Button component (primary, secondary, etc.)
├── Card.tsx                # Card container with header/body/footer
├── Input.tsx               # Text input, textarea, select dropdown
├── Badge.tsx               # Badge and status badge components
├── Loading.tsx             # Skeleton, spinner, empty state
└── index.ts                # Exports all UI components
```

**Usage Example:**
```typescript
import { Button, Card, Input, Badge } from '@/components/ui'
```

#### `/src/components/layout/` - Layout Components

```
layout/
├── Header.tsx              # Top navigation bar
├── Sidebar.tsx             # Left sidebar navigation
├── DashboardLayout.tsx     # Main layout wrapper
└── index.ts                # Layout component exports
```

**Usage Example:**
```typescript
import { DashboardLayout, Header, Sidebar } from '@/components/layout'
```

#### `/src/components/charts/` - Chart Components

```
charts/
├── BarChart.tsx            # Bar chart visualization
├── LineChart.tsx           # Line chart visualization
├── PieChart.tsx            # Pie chart visualization
├── AreaChart.tsx           # Area chart visualization
├── GaugeChart.tsx          # Gauge/circular progress
├── ProgressGauge.tsx       # Linear progress bar
└── index.ts                # Chart component exports
```

**Usage Example:**
```typescript
import { BarChart, LineChart, PieChart } from '@/components/charts'
```

#### `/src/components/tables/` - Table Components

```
tables/
├── DataTable.tsx           # Advanced table with sorting/filtering
└── index.ts                # Table component exports
```

**Usage Example:**
```typescript
import { DataTable } from '@/components/tables'
```

### `/src/pages/`

Page components representing different sections of the application.

```
pages/
├── DashboardPage.tsx       # Main dashboard with metrics
├── AnalyticsPage.tsx       # Advanced analytics
├── ProductsPage.tsx        # Products management
├── UsersPage.tsx           # Users directory
├── ReportsPage.tsx         # Reports section
├── SettingsPage.tsx        # Settings page
└── index.ts                # Page exports
```

**Features:**
- Each page is independent
- Uses shared components from `components/`
- Integrates with Zustand stores
- Responsive design built-in

### `/src/store/`

Zustand state management stores.

```
store/
└── index.ts                # All stores (UI, Filter, Analytics)
```

**Stores:**
- `useUIStore`: Dark mode, sidebar state
- `useFilterStore`: Date ranges, filters
- `useAnalyticsStore`: Loading, error states

### `/src/types/`

TypeScript interfaces and type definitions.

```
types/
└── index.ts                # All type definitions
```

**Key Types:**
- `MetricCard`: Metric display card
- `ChartDataPoint`: Chart data structure
- `Product`, `User`: Data models
- `FilterState`: Filter configuration
- `Status`: Enum for status values

### `/src/data/`

Mock data for demonstration and testing.

```
data/
└── mockData.ts             # All mock data
```

**Mock Data:**
- Revenue trends
- User growth
- Traffic sources
- Products
- Users
- Analytics summaries

### `/src/utils/`

Utility functions and helpers.

```
utils/
└── formatting.ts           # Formatting and helper functions
```

**Functions:**
- `formatCurrency()`: Format numbers as currency
- `formatDate()`: Format dates
- `exportToCSV()`: Export data to CSV
- `debounce()`: Debounce function calls
- `getStatusColor()`: Get color for status

### `/src/hooks/`

Custom React hooks for common logic.

```
hooks/
└── index.ts                # Custom hooks
```

**Hooks:**
- `useSearch()`: Search with debouncing
- `useLoading()`: Loading state management
- `useFetch()`: Data fetching
- `useLocalStorage()`: Local storage persistence
- `useWindowSize()`: Window size tracking
- `useKeyboardShortcut()`: Keyboard shortcuts

## Data Flow

### Component Hierarchy

```
App
├── Router
│   ├── DashboardPage
│   ├── AnalyticsPage
│   ├── ProductsPage
│   ├── UsersPage
│   ├── ReportsPage
│   └── SettingsPage
│
└── Layout (in each page)
    ├── Header
    ├── Sidebar
    └── Main Content
        ├── Cards
        ├── Charts
        └── Tables
```

### State Management Flow

```
Global State (Zustand)
├── useUIStore
│   ├── darkMode
│   ├── sidebarOpen
│   └── LocalStorage persistence
│
├── useFilterStore
│   ├── dateRange
│   ├── filters
│   └── Filter state
│
└── useAnalyticsStore
    ├── loading
    └── error
```

## Styling Architecture

### Tailwind CSS Structure

```
Global Styles (src/index.css)
├── @tailwind directives
├── Custom utility classes
├── Component layer styles
└── Dark mode support

Component Styles (inline)
├── className with Tailwind utilities
├── Dark mode variants
└── Responsive breakpoints
```

## Configuration Files

### `tsconfig.json`
- TypeScript compiler options
- Path aliases (`@/*` → `src/*`)
- Strict type checking enabled

### `tailwind.config.js`
- Color palette definitions
- Custom animations
- Breakpoint configuration

### `vite.config.ts`
- Vite build configuration
- Development server settings
- Path aliases

### `.eslintrc.json`
- Code quality rules
- React plugin configuration
- TypeScript support

### `.prettierrc.json`
- Code formatting rules
- Consistent code style

## Build Output

### Production Build

```
dist/
├── index.html              # HTML entry point
├── assets/
│   ├── index-[hash].js    # Main JavaScript bundle
│   ├── index-[hash].css   # CSS bundle
│   └── [other assets]
└── index-[hash].js.map    # Source map (dev only)
```

**Build Features:**
- Minified JavaScript and CSS
- Automatic code splitting
- Asset optimization
- Source maps for debugging

## Import Paths

### Using Path Aliases

Instead of:
```typescript
import { Button } from '../../../components/ui/Button'
```

Use:
```typescript
import { Button } from '@/components/ui'
```

### Common Imports

```typescript
// Components
import { Button, Card, Input } from '@/components'

// Pages
import { DashboardPage, ProductsPage } from '@/pages'

// Store
import { useUIStore, useFilterStore } from '@/store'

// Types
import { Product, User, FilterState } from '@/types'

// Data
import { mockProducts, mockUsers } from '@/data/mockData'

// Utilities
import { formatCurrency, debounce } from '@/utils/formatting'

// Hooks
import { useSearch, useFetch } from '@/hooks'
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`)
- **Pages**: PascalCase + "Page" (e.g., `DashboardPage.tsx`)
- **Utilities**: camelCase (e.g., `formatting.ts`)
- **Types**: camelCase (e.g., `index.ts`)
- **Folders**: kebab-case (e.g., `components/`)

## Module Organization

### Component Module

Each component is:
1. **Self-contained**: Has all dependencies
2. **Reusable**: Generic and customizable
3. **Typed**: Full TypeScript support
4. **Tested**: Ready for unit tests
5. **Exported**: Available from index file

### Page Module

Each page:
1. **Imported components**: From `@/components`
2. **Uses stores**: From `@/store`
3. **Layout wrapper**: Uses `DashboardLayout`
4. **Responsive**: Mobile to desktop
5. **Type-safe**: TypeScript interfaces

## Adding New Files

### New Component

1. Create in appropriate folder
2. Implement with TypeScript
3. Add to folder's `index.ts`
4. Use in pages or other components

### New Page

1. Create in `src/pages/`
2. Add to `pages/index.ts`
3. Import in `App.tsx`
4. Add route to router
5. Add navigation item to sidebar

### New Utility

1. Create in `src/utils/`
2. Export from file
3. Import where needed
4. Use in components

## Performance Considerations

### Code Splitting
- Routes automatically split
- Dynamic imports available
- Bundle optimization

### Tree Shaking
- Only used code included
- Unused exports removed
- CSS minification

### Memoization
- React.memo for expensive components
- useMemo for expensive calculations
- useCallback for functions

---

**This structure keeps the codebase organized, maintainable, and scalable! 📐**
