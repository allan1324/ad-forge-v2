/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#00E5C3",
          ink: "#E6F7F3",
          bg: "#0B0F14",
          surface: "#121821",
          muted: "#8A94A1",
          accent: "#8AFFE7"
        },
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#60A5FA"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Sora", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,.12)",
        md: "0 6px 16px rgba(0,0,0,.2)",
        lg: "0 0 40px rgba(0, 229, 195, .15)",
      },
      transitionTimingFunction: {
        'custom-ease': 'cubic-bezier(.2,.8,.2,1)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms cubic-bezier(.2,.8,.2,1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}