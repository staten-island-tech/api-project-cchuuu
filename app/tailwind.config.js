/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./JS/main.js"],
  theme: {
    extend: {
      colors: {
        peachpuff: "#FFDAB9",
      },
    },
  },
  plugins: [require("daisyui")],
};
