const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
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
        primaryAlpha: "#C9F6F7",
        whiteWithAlpha: "#ffffffa3",
        secondary50: "#EDEDED",
        secondary100: "#4D4D4D",
        secondary150: "#232323",
        secondary200: "#2C2C2C",
        secondary300: "#252526",
        secondary400: "#1F1F1F",

        // These are special colors, hence have them here
        whatsapp: "#1ED760",
        twitter: "#55ACEE",
        telegram: "#85B6FF",
        linkedIn: "#0A66C2",
        facebook: "#0000FF",

        // TODO: Old colors, should be deleted
        secondary: "#06062D",
        secondaryAlpha: "#181835",
        secondaryAlpha200: "rgba(24, 24, 53, 0.8)",
        secondaryAlpha300: "rgba(6, 6, 45, 0.8)",
        blackAlpha30: "rgba(0,0,0,.30)",
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
        mediumGray: "#ABA6A6",
      },

      zIndex: {
        1000: "1000",
      },

      gridTemplateRows: {
        autoRepeat2: "repeat(2, auto)",
        autoRepeat3: "repeat(3, auto)",
      },

      gridTemplateColumns: {
        autoRepeat2: "repeat(2, auto)",
        autoRepeat3: "repeat(3, auto)",
      },

      fontSize: {
        xxs: [
          "0.625rem",
          {
            lineHeight: "1rem",
          },
        ],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".visually-hidden": {
          clip: "rect(0 0 0 0)",
          border: 0,
          height: 1,
          margin: 0,
          overflow: "hidden",
          padding: 0,
          position: "absolute",
          width: 1,
        },
      });
    }),
  ],
};
