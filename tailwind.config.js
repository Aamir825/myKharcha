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
        // Luxury Emerald & Forest Green Palette
        emerald: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        forest: {
          50: '#f2f9f5',
          100: '#e1f2e9',
          200: '#c4e4d4',
          300: '#99cfb5',
          400: '#67b390',
          500: '#439772',
          600: '#327a5b',
          700: '#28624a',
          800: '#224e3c',
          900: '#1d4133',
          950: '#0c221a',
        },
        // Royal Gold & Amber Palette
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        // Category colors tuned for dark green & gold harmony
        category: {
          rent: '#047857',       // Forest Emerald
          grocery: '#d97706',    // Warm Amber Gold
          electricity: '#059669',// Deep Mint Pine
          vehicle: '#b45309',    // Bronze Gold
          gas: '#0d9488',        // Teal Jade
          water: '#0284c7',      // Sapphire Pine
          uncle: '#ca8a04',      // Royal Gold
          coral: '#e11d48',      // Rich Ruby (for alerts)
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
        'gold-glow': '0 8px 24px rgba(217, 119, 6, 0.22)',
        'emerald-glow': '0 8px 24px rgba(6, 78, 59, 0.28)',
      },
    },
  },
  plugins: [],
}
