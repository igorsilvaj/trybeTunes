/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.jsx'],
  theme: {
    screens: {
      sm: '1px',
      // => @media (min-width: 1px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        loginSmall: 'url(./assets/logoTrybetunes.png)',
        loginNormal: 'url(./assets/login.png)',
        loading: 'url(./assets/loadingBg.png)',
        search: 'url(./assets/searchBg.png)',
        mGlass: 'url(./assets/mGlass.png)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
