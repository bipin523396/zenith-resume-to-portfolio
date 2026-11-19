/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'Outfit', 'sans-serif'],
        editorial: ['"Playfair Display"', 'serif'],
        syne: ['Syne', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
        space: ['"Space Grotesk"', 'sans-serif']
      },
      colors: {
        brand: {
          navy: '#f5f0e8',
          blue: '#c9a84c',
          'blue-hover': '#e8d5a3',
          'blue-light': 'rgba(201, 168, 76, 0.12)',
          secondary: '#e8d5a3',
          bg: '#0d0f14',
          surface: '#12151c',
          text: '#ddd8cc',
          muted: '#8a8478',
          border: 'rgba(200, 180, 120, 0.14)',
          success: '#10B981',
          warning: '#c9a84c',
          error: '#EF4444'
        },
        ram: {
          bg: '#0d0f14',
          bg2: '#12151c',
          bg3: '#181c25',
          gold: '#c9a84c',
          goldLight: '#e8d5a3',
          bronze: '#8b6914',
          border: 'rgba(200, 180, 120, 0.14)',
          text: '#ddd8cc',
          muted: '#8a8478',
          ivory: '#f5f0e8'
        },
        zenith: {
          50: '#fdfbf7',
          100: '#fbf7ee',
          200: '#f5edda',
          300: '#eedfbc',
          400: '#e0c78a',
          500: '#c9a84c',
          600: '#b8943d',
          700: '#997631',
          800: '#8b6914',
          900: '#684d12',
          950: '#382806'
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
