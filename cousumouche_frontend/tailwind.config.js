/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       screens: {
        'custom': '1100px',
        'mediumcustom': '829px'
      },
      fontFamily: {
        poiret: ['Poiret', 'cursive'],
        nickainley: ['Nickainley', 'cursive'],
      },
    },
  },
  plugins: [],
}