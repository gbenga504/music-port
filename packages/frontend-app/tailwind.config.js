const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["ubuntu", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      backgroundColor: {
        page: "#FFFDFA",
      },
    },
  },
  plugins: [],
};
