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
        widthify: "widthify 1s ease-in",
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

      zIndex: {
        1000: "1000",
      },
    },
  },
  plugins: [],
};
