/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bdGreen: {
          950: '#011e16',
          900: '#022c22',
          800: '#064E3B', // Primary dark green
          700: '#0B6B45', // Secondary green
          600: '#059669',
          500: '#10b981',
          100: '#d1fae5',
          50: '#f0fdf4'
        },
        bdRed: {
          700: '#b91c1c',
          600: '#dc2626',
          500: '#F42A41', // Bangladesh Red
          400: '#f87171',
          100: '#fee2e2',
          50: '#fff1f2'
        },
        bdDark: {
          950: '#030d0a',
          900: '#071A14', // Dark background
          800: '#0f2921',
          700: '#1a3a30',
          600: '#2d5246'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        bangla: ['Hind Siliguri', 'Kalpurush', 'sans-serif'],
        serif: ['Cinzel', 'Georgia', 'serif']
      }
    },
  },
  plugins: [],
}
