/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        }
      },
      animation: {
        wiggle: 'wiggle .8s ',
      }
    },
    screens: {
      "newmd": '800px',
      "sm": '640px',
      "md": '768px',
      "lg": '1024px',
      "xl": '1280px',
      "2xl": '1536px',



    }
  },
  plugins: [],
}

