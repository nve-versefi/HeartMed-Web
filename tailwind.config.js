/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#EBF1F5',
          200: '#D9E3EA',
          300: '#C5D2DC',
          400: '#9BA9B4',
          500: '#707D86',
          600: '#55595F',
          700: '#33363A',
          800: '#25282C',
          900: '#151719',
        },
        purple: {
          100: '#F4F4FF',
          200: '#E2E1FF',
          300: '#CBCCFF',
          400: '#ABABFF',
          500: '#8D8DFF',
          600: '#5D5DFF',
          700: '#4B4ACF',
          800: '#38379C',
          900: '#262668',
        },
        pomegranate: {
          100: '#FCF1E6',
          200: '#F7D9C1',
          300: '#F2BD9D',
          400: '#E87C5A',
          500: '#DF2F1D',
          600: '#C72918',
          700: '#A61D11',
          800: '#85150B',
          900: '#630C06',
        },
        tunderbird: {
          100: '#FAEFE6',
          200: '#F0D1BD',
          300: '#E6B29A',
          400: '#D46F59',
          500: '#C12521',
          600: '#AD1F1A',
          700: '#911713',
          800: '#750F0C',
          900: '#570807',
        },
        woodsmoke: {
          100: '#E8E8E8',
          200: '#C2C4C4',
          300: '#A0A3A3',
          400: '#595C5C',
          500: '#151616',
          600: '#121414',
          700: '#0D1211',
          800: '#070D0C',
          900: '#040A09',
        },
        boulder: {
          100: '#F2F2F2',
          200: '#DEDEDE',
          300: '#C9C9C9',
          400: '#A2A2A3',
          500: '#7A7A7B',
          600: '#62626E',
          700: '#44445C',
          800: '#2C2C4A',
          900: '#191938',
        },
      
      },
      spacing: {
        '9/16': '56.25%',
        '3/4': '75%',
        '1/1': '100%',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        'architects-daughter': ['var(--font-architects-daughter)', 'sans-serif']
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3.25rem',
        '6xl': '4rem',
      },
      inset: {
        'full': '100%',
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
        widest: '0.4em',
      },
      minWidth: {
        '10': '2.5rem',
      },
      scale: {
        '98': '.98'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
