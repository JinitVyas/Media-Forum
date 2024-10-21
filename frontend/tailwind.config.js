/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'intro-banner-bg':"url('Photos/IntroBannerBg.jpg')",
      }
    },
  },
  plugins: [],
}

