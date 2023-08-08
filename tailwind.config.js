/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          DEFAULT:'rgba(3,190,252,.5)',
        },
        secondary:{
          DEFAULT:'rgba(194, 252, 3,0.5)',
        },
        adprimary:{
          DEFAULT:'rgba(242, 220, 162,0.5)',
        }
      }
    },
  },
  plugins: [],
}

