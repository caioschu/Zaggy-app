/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        zaggy: {
          orange: '#FF6B35',
          'orange-dark': '#E55A2B',
          'orange-light': '#FF8A5B',
        },
        secondary: '#00D4AA',
        accent: '#FFD700',
        danger: '#E74C3C',
        success: '#27AE60',
        warning: '#F39C12',
        dark: '#2C3E50',
        light: '#F8F9FA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}