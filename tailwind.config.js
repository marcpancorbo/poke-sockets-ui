/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'bali-hai': {
          '50': '#f4f8fa',
          '100': '#e6eff3',
          '200': '#d2e3eb',
          '300': '#b4d0dc',
          '400': '#90b8ca',
          '500': '#729fbb',
          '600': '#628cae',
          '700': '#577a9e',
          '800': '#4b6582',
          '900': '#3f5469',
          '950': '#2a3441',
        },
      }
    },
  },
  plugins: [],
}

