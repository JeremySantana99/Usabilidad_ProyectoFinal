/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      spacing: { 44: "11rem" }, // útil para objetivos grandes
    },
  },
  plugins: [],
};
