/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        header: '560px',
      },
      colors: {
        main: '#00C893',
        subMain: '#069A73',
        deepGray: '#F3F9FF',
        dryGray: '#F3F4F6',
        flash: '#FF1E1E',
        star: '#FFB000',
        deepest: '#E1F3EE',
        text: '#C0C0C0',  
        overlay:'#00000010',
      },
      fontSize: {
        h1: '2.6rem',
      },
      screens: {
        xs: '475px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
