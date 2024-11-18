/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./main.js"],
  theme: {
    extend: {
      colors: {
        peachpuff: "#FFDAB9",
      },
    },
  },
  plugins: [require("daisyui")],
};
