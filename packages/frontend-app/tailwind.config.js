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
      textColor: {
        title: "rgb(41, 43, 41)",
        subTitle: "rgb(86, 93, 90)",
        placeholder: "#6f7672",
      },
    },
  },
  plugins: [],
};
