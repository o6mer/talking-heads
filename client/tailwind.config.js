/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F9F7F7",
        secondary: "#DBE2EF",
        thirdy: "#225795",
        fourthy: "#112D4E",

        primaryDark: "#1B262C",
        secondaryDark: "#0F4C75",
        thirdyDark: "#3282B8",
        fourthyDark: "#BBE1FA",
      },
    },
  },
  plugins: [],
};
