const defaultTheme = require("tailwindcss/defaultTheme");

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
        secondary: "#06062D",
        secondaryAlpha: "#181835",
        secondaryAlpha200: "rgba(24, 24, 53, 0.8)",
        secondaryAlpha300: "rgba(6, 6, 45, 0.8)",
        blackAlpha45: "rgba(0,0,0,.45)",

        // These are special colors, hence have them here
        whatsapp: "#1ED760",
        twitter: "#55ACEE",
        telegram: "#85B6FF",
        linkedIn: "#0A66C2",
        facebook: "#0000FF",

        // These are colors used in card component
        title: "#ffffffeb",
        artist: "#ffffffa3",
        play: "#252526",
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

      borderRadius: {
        50: "50%",
      },

      zIndex: {
        1000: "1000",
      },

      spacing: {
        9: "9px",
        144: "144px",
        156: "156px",
        214: "214px",
        250: "250px",
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
  plugins: [],
};
