# Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will open at `http://localhost:5173`

## Architecture Overview

### Component Hierarchy

```
App (Router)
├── DashboardLayout
│   ├── Header (with theme toggle, notifications, user menu)
│   ├── Sidebar (navigation)
│   └── Main Content
│       ├── Cards (Metrics)
│       ├── Charts (BarChart, LineChart, etc.)
│       ├── DataTable
│       └── Other Components
```

### State Management Flow

```
Zustand Stores
├── useUIStore
│   ├── darkMode
│   ├── sidebarOpen
│   └── toggleFunctions
│
├── useFilterStore
│   ├── dateRange
│   ├── filters
│   └── setters
│
└── useAnalyticsStore
    ├── loading
    └── error
```

## Adding New Features

### 1. Adding a New Page

```typescript
// src/pages/NewPage.tsx
import { DashboardLayout, Card } from '@/components'

export const NewPage: React.FC = () => {
  return (
    <DashboardLayout title="New Page">
      <Card>
        {/* Your content */}
      </Card>
    </DashboardLayout>
  )
}
```

Then add route in `src/App.tsx`:

```typescript
<Route path="/new-page" element={<NewPage />} />
```

And navigation item in `src/components/layout/DashboardLayout.tsx`:

```typescript
{
  id: 'newPage',
  label: 'New Page',
  icon: <Icon className="h-5 w-5" />,
  href: '/new-page',
}
```

### 2. Creating a New Component

Place in appropriate folder:
- UI components: `src/components/ui/`
- Layout components: `src/components/layout/`
- Chart components: `src/components/charts/`
- Table components: `src/components/tables/`

Example:

```typescript
// src/components/ui/YourComponent.tsx
import React from 'react'
import clsx from 'clsx'

interface YourComponentProps {
  title?: string
  variant?: 'primary' | 'secondary'
}

export const YourComponent: React.FC<YourComponentProps> = ({
  title,
  variant = 'primary',
}) => {
  return (
    <div className={clsx('your-styles')}>
      {title && <h3>{title}</h3>}
    </div>
  )
}
```

Export from `src/components/ui/index.ts`:

```typescript
export { YourComponent } from './YourComponent'
```

### 3. Adding New Charts

```typescript
// src/pages/YourPage.tsx
import { YourChart } from '@/components/charts'

<YourChart
  data={chartData}
  dataKeys={['value']}
  height={300}
  title="Chart Title"
/>
```

### 4. Implementing API Integration

Replace mock data with API calls:

```typescript
// src/pages/ProductsPage.tsx
import { useFetch } from '@/hooks'

export const ProductsPage = () => {
  const { data: products, loading, error } = useFetch('/api/products')

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorState message={error.message} />

  return <DataTable data={products} columns={columns} />
}
```

### 5. Working with Forms

```typescript
import { Input, Button, Select } from '@/components/ui'

<form onSubmit={handleSubmit}>
  <Input
    label="Name"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    fullWidth
  />
  <Select
    label="Category"
    options={categories}
    value={formData.category}
    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
  />
  <Button type="submit">Submit</Button>
</form>
```

## Styling Guidelines

### Tailwind CSS Best Practices

1. **Use custom classes**: Define reusable classes in `src/index.css`
2. **Dark mode support**: Always include dark mode variants

```typescript
className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
```

3. **Responsive design**: Use Tailwind breakpoints

```typescript
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
```

4. **Custom components**: Use component layer for complex components

## Performance Tips

1. **Memoization**: Use `React.memo()` for expensive components
2. **Code splitting**: Routes are automatically code-split
3. **Optimize re-renders**: Use proper key props and dependencies
4. **Image optimization**: Use SVG for icons (Lucide)

## Debugging

### Console Logging
```typescript
console.log('Debug info:', value)
```

### React DevTools
- Install React DevTools browser extension
- Inspect component hierarchy
- View and edit props/state

### Network Inspector
- Check API requests in Network tab
- Verify data structure
- Monitor performance

## Testing

Add tests with Vitest:

```bash
npm install --save-dev vitest @testing-library/react
```

Example test:

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

## Code Quality

### ESLint
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

### Prettier Formatting
```bash
npx prettier --write "src/**/*.{ts,tsx}"
```

## Common Patterns

### Dark Mode Toggle
```typescript
import { useUIStore } from '@/store'

const { darkMode, toggleDarkMode } = useUIStore()

<button onClick={toggleDarkMode}>
  {darkMode ? 'Light' : 'Dark'}
</button>
```

### Date Range Filtering
```typescript
import { useFilterStore } from '@/store'

const { filters, setDateRange } = useFilterStore()

// Access current date range
filters.dateRange.start
filters.dateRange.end
```

### Data Export
```typescript
import { exportToCSV, exportToJSON } from '@/utils/formatting'

<button onClick={() => exportToCSV(data, 'export.csv')}>
  Export CSV
</button>
```

### Custom Hooks Usage
```typescript
import { useSearch, useLoading, useFetch } from '@/hooks'

const { searchTerm, setSearchTerm } = useSearch()
const { loading, withLoading } = useLoading()
const { data, loading, error } = useFetch('/api/endpoint')
```

## Deployment Checklist

- [ ] Build successfully: `npm run build`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No ESLint errors: `npm run lint`
- [ ] Test all pages and features
- [ ] Verify dark mode works
- [ ] Check responsive design
- [ ] Test on mobile devices
- [ ] Verify all exports work
- [ ] Check performance metrics
- [ ] Update documentation

## Troubleshooting

### Build Errors

**Issue**: Path alias not working
**Solution**: Check `tsconfig.json` and `vite.config.ts` paths

**Issue**: Missing dependencies
**Solution**: Run `npm install` and clear node_modules if needed

### Runtime Errors

**Issue**: Component not rendering
**Solution**: Check React imports and component exports

**Issue**: Styling issues
**Solution**: Verify Tailwind CSS classes and dark mode setup

**Issue**: State not updating
**Solution**: Check Zustand store setup and hooks usage

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Recharts](https://recharts.org)
- [TanStack Table](https://tanstack.com/table)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Router](https://reactrouter.com)

## Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit for review
5. Update documentation

## Support

For questions or issues, refer to component documentation or create an issue.

---

**Happy coding! 🚀**
