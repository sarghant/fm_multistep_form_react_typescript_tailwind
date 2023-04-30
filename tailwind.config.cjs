/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Ubuntu"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
