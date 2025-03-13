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
          background: '#ffffff',
          text: '#000000',
        },
        // Dark theme colors
        dark: {
          background: '#1a1a1a',
          text: '#ffffff',
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
