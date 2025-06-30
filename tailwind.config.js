/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-primary': '#1f2937',      // Gray-800 (Dark text)
        'brand-secondary': '#6b7280',    // Gray-500 (Medium text)
        'brand-accent': '#36a893',       // Teal from gradient
        'brand-accent-dark': '#1e5288',  // Blue from gradient
        'brand-light': '#f9fafb',        // Gray-50 (Background)
        'brand-dark': '#111827',         // Gray-900 (Darker elements)
      }
    },
  },
  plugins: [],
};