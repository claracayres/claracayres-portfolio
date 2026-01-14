/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // 🔴 ESSENCIAL
  theme: {
    extend: {
      colors: {
        darkBlue: "#0B1340",
        pink: "#FF1493",
        purple: "#9370DB",
        lightPurple: "#D8BFD8",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [scrollbarHide],
};
