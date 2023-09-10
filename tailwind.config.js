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
          DEFAULT:'#8b00f7ff',
          // DEFAULT:'rgba(83,112,255,255)',
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

// 3,190,252,