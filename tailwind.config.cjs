/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nexus': {
          '50': '#f0f9ff',
          '100': '#e0f2ff',
          '200': '#bae6ff',
          '300': '#7dd3ff',
          '400': '#38b9ff',
          '500': '#0e9cff',
          '600': '#0077e0',
          '700': '#005db3',
          '800': '#004a8c',
          '900': '#003566',
          'gradient-start': '#0066ff',
          'gradient-mid': '#0088ff',
          'gradient-end': '#00a8ff',
          'gloss': 'rgba(255, 255, 255, 0.15)'
        },
      },
      backgroundImage: {
        'nexus-gradient': 'linear-gradient(90deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
