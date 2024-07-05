/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    fontFamily: {
      'sans':['Ga Maamli','sans-serif'],

    },
    extend: {
      backgroundImage:{
      "home":"url('/assets/bg.png')"
    }
    },
  },
  plugins: [],
}

