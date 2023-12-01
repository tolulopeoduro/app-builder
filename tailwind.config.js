/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'gray-1': '#686868',
      success: '#3A6238',
      white: '#ffffff',
      primary: '#03FFF0',
      secondary: '#035F5D',
      light: '#B4CFE3',
      dark: '#030808',
      warning: '#E4C703',
      danger: '#F10117',
      'light-gray': '#C1C1C1',
      'green-1': '#95E365'
    },
    extend: {}
  },
  plugins: []
}
