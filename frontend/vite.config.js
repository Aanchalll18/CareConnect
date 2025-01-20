// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     historyApiFallback: true, // This will allow React Router to handle the routes client-side
//     port:5173
//   }
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Specifies the development server port
    open: true, // Opens the browser automatically when the server starts
    proxy: {
      "/api": {
        target: "http://localhost:4001", // Replace with your backend API's base URL
        changeOrigin: true,
      },
    },
    historyApiFallback: true, // Ensures React Router handles client-side routing
  },
  optimizeDeps: {
    exclude: ["razorpay"], // Prevents Vite from optimizing Razorpay
  },
  build: {
    commonjsOptions: {
      include: [/razorpay/, /node_modules/], // Ensures Razorpay works during build
    },
  },
});

