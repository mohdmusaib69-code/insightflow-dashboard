# Quick Start Guide

Get your Analytics Dashboard up and running in 5 minutes!

## Prerequisites

- **Node.js**: Version 16 or higher
- **npm**: Version 7 or higher (or yarn)
- **Git**: For version control (optional)

## Installation

### Step 1: Clone or Download

```bash
# Using Git
git clone <repository-url>
cd analytics-dashboard

# Or download and extract the ZIP file
unzip analytics-dashboard.zip
cd analytics-dashboard
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will automatically open in your browser at `http://localhost:5173`

## First Steps

### 1. Explore the Dashboard

- **Home Page**: Displays key metrics and charts
- **Sidebar Navigation**: Jump between different sections
- **Theme Toggle**: Click the moon/sun icon to switch dark/light mode

### 2. Navigate to Different Pages

- **Dashboard**: Main analytics overview
- **Analytics**: Advanced trends and comparisons
- **Products**: Product catalog and sales data
- **Users**: Team and user management
- **Reports**: Report generation and management
- **Settings**: Preferences and configuration

### 3. Try the Features

#### Charts
- Hover over charts to see detailed data
- Click chart elements for interactions

#### Tables
- Search: Use the search box to find data
- Sort: Click column headers to sort
- Filter: Use date range and other filters
- Paginate: Navigate through pages

#### Dark Mode
- Click the moon/sun icon in the header
- Theme persists across sessions

#### Data Export
- Click "Export" buttons on data pages
- Download as CSV or JSON

## Common Tasks

### Change Date Range

1. Click period buttons (Week, Month, Quarter, Year)
2. Or select custom dates
3. Charts and data update automatically

### Search for Data

1. Find the search box on any page
2. Type to search in real-time
3. Results update instantly

### Filter Products

1. Go to Products page
2. Use status dropdown to filter
3. Use search to find specific products

### View User Details

1. Go to Users page
2. Click on any user row
3. View full user information

### Export Data

1. Navigate to Products or Users page
2. Click CSV or JSON export button
3. File downloads automatically

## Configuration

### Dark Mode

Automatically detected from system preferences.
Manual override available in theme toggle.

### Notifications

- Configure in Settings page
- Toggle push, email, or weekly reports

### User Profile

- Update in Settings page
- Change name, email, and company

## Tips & Tricks

### Keyboard Shortcuts

- `Ctrl/Cmd + K`: Focus search (when implemented)
- Tab: Navigate between elements
- Enter: Activate buttons/links

### Performance Tips

- Use date range filters to reduce data
- Search to find specific records quickly
- Charts load progressively

### Responsive Design

- Resize browser to see responsive layout
- Works perfectly on mobile devices
- Touch-friendly controls on tablets

## Troubleshooting

### Page Won't Load

**Solution**: Refresh the page or clear browser cache

```bash
Ctrl + Shift + Delete (Windows)
Cmd + Shift + Delete (Mac)
```

### Dark Mode Not Working

**Solution**: Check your browser's dark mode preference

```bash
# Open DevTools Console
localStorage.getItem('darkMode')
# Should show 'true' or 'false'
```

### Charts Not Displaying

**Solution**: Wait for charts to load or try refreshing

### Search Not Finding Data

**Solution**: Ensure the search term matches data in the table

## Next Steps

### For Developers

1. Read [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
2. Explore the component structure
3. Start modifying and building features

### For Deploying

1. Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Choose your deployment platform
3. Follow platform-specific instructions

### For Integration

1. Replace mock data with API calls
2. Update environment variables
3. Configure authentication

## File Structure

```
analytics-dashboard/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── store/          # State management
│   ├── types/          # TypeScript types
│   ├── data/           # Mock data
│   ├── utils/          # Utility functions
│   ├── hooks/          # Custom hooks
│   ├── App.tsx         # Main app
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static files
├── index.html          # HTML template
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── tailwind.config.js  # Tailwind config
├── vite.config.ts      # Vite config
└── README.md           # Documentation
```

## Quick Command Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript

# Dependencies
npm install              # Install all dependencies
npm update               # Update dependencies
npm audit                # Check security
```

## Getting Help

### Documentation Files

- [README.md](./README.md) - Project overview
- [FEATURES.md](./FEATURES.md) - Complete feature list
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Development help
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deployment help

### Online Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org)
- [Zustand GitHub](https://github.com/pmndrs/zustand)

### Browser DevTools

Press `F12` to open developer tools:
- **Console**: View errors and logs
- **Network**: Check API requests
- **Elements**: Inspect HTML
- **Performance**: Analyze performance

## What's Next?

1. ✅ **Explore**: Try all features and pages
2. 🎨 **Customize**: Modify colors and styling
3. 📊 **Integrate**: Connect to your data sources
4. 🚀 **Deploy**: Launch to production

---

**You're all set! Happy analyzing! 📊**

Need help? Check the documentation or refer to the development guide.
