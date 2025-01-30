const { addDynamicIconSelectors } = require('@iconify/tailwind');


module.exports = {
  darkMode: 'false',
  content: [
    "./src/**/*.{html,ts}",
    './node_modules/preline/preline.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        monserrat: ['Monserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        wedgie: ['Wedgie', 'sans-serif'],
        josefina_sans: ['Josefina Sans', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        cinzel: ['Cinzel', 'sans-serif'],
        popins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(110%)' },
          '100%': { transform: 'translateX(-110%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
    },
  },
  plugins: [
    addDynamicIconSelectors(),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],

}

