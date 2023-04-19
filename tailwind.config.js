/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
        buttonRed: "#E2D2D2"
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
