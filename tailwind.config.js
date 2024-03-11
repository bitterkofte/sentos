/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "half-black": "#00000086",
        "serika-yellow": "#f59e0b",
        "serika-light": "#646669",
        "serika-gray": "#323437",
        "serika-dark": "#2c2e31",
      }
    },
  },
  plugins: [],
}