/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#e0f9f7',
          200: '#ccf0ee',
          300: '#99e6e0',
          400: '#66ddd4',
          500: '#33d4cc',
          600: '#2db8b0',
          700: '#269c94',
          800: '#1f8078',
          900: '#18645c',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in': 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' },
        },
      },
      boxShadow: {
        'sm-green': '0 2px 8px rgba(34, 197, 94, 0.12)',
        'md-green': '0 4px 16px rgba(34, 197, 94, 0.15)',
        'lg-green': '0 10px 32px rgba(34, 197, 94, 0.2)',
        'xl-green': '0 20px 48px rgba(34, 197, 94, 0.25)',
        'premium': '0 20px 50px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
