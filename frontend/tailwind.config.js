/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      'primary':"#c77dff",
      'purple2':"#7b2cbf",
      "gray":'#A6AEBF',
      "white":'#FFFFFF',
      'lime-green': "#32CD32",
      'light-blue': "#D4F6FF",
      'blue-200':'#B9E5E8',
      'grey-500':'#3C3D37',
      'grey-100':'#707070',
      'light-grey':'#c4c4c4',
      'greytxt':'#242424',
      'light-pink':'#FFE1FF',
      'pink2':'#FFEAE3',
      'lightred':'#E86471',
      'red2':'#D40D12',
      'green2':'#45BF55',
      'red3':'#FF1D23'
    },
    gridTemplateColumns:{
      'auto':'repeat(auto-fill,minmax(200px,1fr))'
    }
  },
  plugins: [],
};