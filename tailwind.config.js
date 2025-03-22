const { addDynamicIconSelectors } = require('@iconify/tailwind');


module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        monserrat: ['Monserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        wedgie: ['Wedgie', 'sans-serif'],
        josefina_sans: ['Josefina Sans', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
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
      maskImage: {
        'fade': 'linear-gradient(to bottom, black 60%, transparent 100%)',
      },
    },
  },
  plugins: [
    addDynamicIconSelectors(),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],

}

