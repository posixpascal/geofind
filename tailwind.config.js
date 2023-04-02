/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        times: "Times New Roman",
      },
      colors: {
        'card': "rgb(var(--color-card) / <alpha-value>)",
        'card-headline': "rgb(var(--color-card-headline) / <alpha-value>)",
        'card-paragraph': "rgb(var(--color-card-paragraph) / <alpha-value>)",

        'headline': "rgb(var(--color-headline) / <alpha-value>)",
        'paragraph': "rgb(var(--color-paragraph) / <alpha-value>)",
        'background': "rgb(var(--color-background) / <alpha-value>)",
        'main': "rgb(var(--color-main) / <alpha-value>)",
        'button': "rgb(var(--color-button) / <alpha-value>)",
        'action': "rgb(var(--color-action) / <alpha-value>)",
        'tertiary': "rgb(var(--color-tertiary) / <alpha-value>)",
        'secondary': "rgb(var(--color-secondary) / <alpha-value>)",
        transparent: "transparent",
        current: "currentColor",



      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
