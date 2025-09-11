/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      screens: {
        'custom': '1100px',
        'mediumcustom': '950px',
        '4xl': '1800px',
        '3xl': '1680px'

      },
      fontFamily: {
        poiret: ['Poiret', 'cursive'],
        nickainley: ['Nickainley', 'cursive'],
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
}