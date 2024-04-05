/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
};

export default config;
