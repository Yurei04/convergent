module.exports = {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-sans), sans-serif",
        dyslexic: "'OpenDyslexic', sans-serif",
        readable: "'Lexend', sans-serif",
      },
    },
  },
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
