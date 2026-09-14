/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Primary palette - indigo gradient
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        // Semantic colors
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
        },
        // Neutral palette
        ink: {
          DEFAULT: '#1a1d23',
          secondary: '#4b5563',
          muted: '#9ca3af',
        },
        paper: {
          DEFAULT: '#f8f9fb',
          dark: '#0f1117',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1a1d27',
          hover: '#f3f4f6',
          hoverDark: '#22252f',
        },
        line: {
          DEFAULT: '#e5e7eb',
          soft: '#f0f1f3',
          dark: '#2a2d39',
        },
        // Category colors
        category: {
          rent: '#6366f1',
          grocery: '#f59e0b',
          electricity: '#10b981',
          vehicle: '#8b5cf6',
          gas: '#06b6d4',
          water: '#3b82f6',
          uncle: '#ec4899',
          coral: '#f97316',
        }
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        full: '9999px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0,0,0,.04)',
        sm: '0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)',
        md: '0 4px 6px -1px rgba(0,0,0,.06), 0 2px 4px -2px rgba(0,0,0,.04)',
        lg: '0 10px 15px -3px rgba(0,0,0,.06), 0 4px 6px -4px rgba(0,0,0,.04)',
        xl: '0 20px 25px -5px rgba(0,0,0,.07), 0 8px 10px -6px rgba(0,0,0,.04)',
        'primary-ring': '0 0 0 3px rgba(79, 70, 229, 0.25)',
        'primary-glow': '0 8px 24px rgba(79, 70, 229, 0.18)',
      },
      animation: {
        'pulse': 'pulse 2s infinite',
        'fade-in': 'fadeIn 0.2s ease',
        'slide-up': 'slideUp 0.25s ease',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { transform: 'translateY(16px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
      },
    },
  },
  plugins: [],
}
