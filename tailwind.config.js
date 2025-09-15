/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  prefix: 'af-',
  important: '#adforge-root',
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B0F14',
        surface: '#0E141B',
        panel: '#0F1722',
        line: '#1E293B',
        accent: '#00E5C3',
        'text-hi': '#E6F1F4',
        'text-lo': '#9FB2BF',
      },
      borderRadius: {
        card: '16px',
        input: '12px',
        button: '12px',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,.25)',
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInOverlay: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        backgroundPan: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'fade-in': 'fadeIn 300ms cubic-bezier(.2,.8,.2,1) forwards',
        'slide-in-up': 'slideInUp 500ms cubic-bezier(.2,.8,.2,1) forwards',
        'fade-in-overlay': 'fadeInOverlay 200ms ease-out forwards',
        'background-pan': 'backgroundPan 15s ease infinite',
      },
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(.2,.8,.2,1)',
      },
    },
  },
  plugins: [],
};