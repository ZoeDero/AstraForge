/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        // Light theme colors
        light: {
          background: '#d97706',
          text: '#000000',
        },
        // Dark theme colors
        dark: {
          background: '#d97706',
          text: '#ffffff',
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
