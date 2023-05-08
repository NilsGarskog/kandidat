/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'xl': '0.85rem',
      '2xl': '1rem',
      '3xl': '1.25rem',
      '4xl': '1.5rem'
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        buttonGreen: "#A2B59F",
        buttonRed: "#E2D2D2",
        calYellow: "#FFF2CC",
        calBlue: "#93C6E7",
        calPurple: "#BA94D1"
      },
      fontFamily: {
        latoRegular: "Lato-Regular",
        latoBold: "Lato-Bold",
      }
    },
  },
  plugins: [require("@tailwindcss/forms"),
            require('tailwindcss-image-rendering')],
};
