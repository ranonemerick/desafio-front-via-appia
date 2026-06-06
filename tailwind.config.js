/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/preline/preline/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'floresta': '#1B3022',
        'couro': '#5D4037',
        'pergaminho': '#EFE8D8',
        'ouro': '#A67C00',
        'musgo': '#4A4E4D',
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}