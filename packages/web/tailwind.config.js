const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
      // TypeScript
      'plugins/**/*.ts',
      'nuxt.config.ts',
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        lucky: ['Luckiest Guy', 'sans-serif'],
      },
      colors: {
        green: {
          50: '#E4F5E1',
          100: '#D2EFCE',
          200: '#AFE3A7',
          300: '#8BD681',
          400: '#68CA5A',
          500: '#4AB63B',
          600: '#3A8F2F',
          700: '#2B6922',
          800: '#1B4216',
          900: '#0B1C09',
        },
        blue: {
          50: '#D0E4FC',
          100: '#B8D6FA',
          200: '#88BBF7',
          300: '#59A0F3',
          400: '#2985F0',
          500: '#0F6BD7',
          600: '#0C53A7',
          700: '#083C78',
          800: '#052448',
          900: '#020C18',
        },
        yellow: {
          50: '#FFFFFF',
          100: '#FFF6E5',
          200: '#FFE6B2',
          300: '#FFD57F',
          400: '#FFC44C',
          500: '#FFB319',
          600: '#E59900',
          700: '#B27700',
          800: '#7F5500',
          900: '#4C3300',
        },
      },
    },
  },
}
