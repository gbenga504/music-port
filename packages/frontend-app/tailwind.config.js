const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Circular Std", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      animation: {
        linearXMovement: "linearXMovement 2s ease-in-out infinite",
      },

      keyframes: {
        linearXMovement: {
          "0%": { transform: "translateX(-100vw)" },
          "100%": { transform: "translateX(100vw)" },
        },
      },

      colors: {
        primary: "#0BB4B5",
        secondary: "#06062D",
        secondaryAlpha: "#181835",
        blackAlpha45: "rgba(0,0,0,.45)",
      },

      transformOrigin: {
        "left-center": "left center",
      },

      textColor: {
        primaryGray: "#ABA6A6",
      },

      borderColor: {
        lightGray: "#303048",
        darkGray: "#E6E6E6",
      },

      zIndex: {
        1000: "1000",
      },

      gridTemplateRows: {
        autoRepeat2: "repeat(2, auto)",
        autoRepeat3: "repeat(3, auto)",
      },
    },
  },
  plugins: [],
};
