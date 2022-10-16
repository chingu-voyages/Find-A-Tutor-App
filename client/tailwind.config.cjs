/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2E2E40',
          secondary: '#93DAE5',
          accent: '#F2F2F2',
          neutral: '#FFFFFF',
          'base-100': '#FFFFFF',
        },
      },
      'dark',
    ],
  },
};
