/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      boxShadow: {
        'top-lg': '0 -5px 15px -6px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [
      require('flowbite/plugin')
    ]
}