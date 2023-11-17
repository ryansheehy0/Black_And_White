/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "roboto": ["Roboto", "sans-serif"],
        "roboto-bold": ["Roboto-Bold", "sans-serif"],
      }
    },
  },
  plugins: [],
}

