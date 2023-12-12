/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#CBAFA4',
        customColorHover: '#E3CFC7',
        backgroundColor: '#FFFCF9'
      },
        fontFamily:{
          'primary': ['Inria serif']
        }
      
    },
    
  },
  plugins: [require("daisyui"), require('flowbite/plugin')],
  
}

 