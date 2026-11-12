// tailwind.config.js
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dsdigital: ['DS-Digital', 'monospace'],
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        shine: 'shine 3s infinite',
        'pulse-slow': 'pulseSlow 1.5s infinite',
      },
    },
  },
  plugins: [daisyui, function ({ addBase }) {
    addBase({
      'a': { cursor: 'pointer' },
      'button': { cursor: 'pointer' },
      '[role="button"]': { cursor: 'pointer' },
    });
  }],
};

export default config;
