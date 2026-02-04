/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0f',
          card: '#15151f',
          border: '#2a2a3a',
          hover: '#1f1f2f',
        }
      }
    },
  },
  plugins: [],
}
