/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/templates/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        80: '20rem',
        108: '27rem',
      },
      borderWidth: {
        1: '1px',
        3: '3px',
        14: '14px',
      },
      opacity: {
        80: '0.8',
      },
    },
    container: {
      padding: '1rem',
    },
    colors: {
      background: {
        primary: 'var(--bg-background-primary)',
        secondary: 'var(--bg-background-secondary)',
        tertiary: 'var(--bg-background-tertiary)',

        form: 'var(--bg-background-form)',
      },

      copy: {
        primary: 'var(--text-copy-primary)',
        secondary: 'var(--text-copy-hover)',
      },

      'border-color': {
        primary: 'var(--border-border-color-primary)',
      },

      green: {
        300: '#9ae6b4',
        500: '#48bb78',
        600: '#38a169',
        700: '#2f855a',
        800: '#276749',
      },

      gray: {
        300: '#e2e8f0',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        800: '#2d3748',
      },

      brand: {
        300: 'var(--brand-300)',
        500: 'var(--brand-500)',
        700: 'var(--brand-700)',
        800: 'var(--brand-800)',
        900: 'var(--brand-900)',
      },

      white: '#fff',
      black: '#000',
      transparent: 'transparent',
    },
    fontFamily: {
      sans: ['Jost', 'Helvetica', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
    },
  },
};
