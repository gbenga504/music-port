const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["ubuntu", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      animation: {
        linearXMovement: "linearXMovement 2s ease-in-out infinite",
      },

      backgroundColor: {
        page: "#FFFDFA",
      },

      keyframes: {
        linearXMovement: {
          "0%": { transform: "translateX(-100vw)" },
          "100%": { transform: "translateX(100vw)" },
        },
      },

      textColor: {
        title: "rgb(41, 43, 41)",
        subTitle: "rgb(86, 93, 90)",
        placeholder: "#6f7672",
      },
    },
  },
  plugins: [],
};
