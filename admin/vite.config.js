 import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Specifies the development server port
    historyApiFallback: true, // Handles React Router routes
  },
  optimizeDeps: {
    exclude: ["razorpay", "@mapbox/node-pre-gyp", "mock-aws-s3", "aws-sdk", "nock"], // Exclude backend dependencies
  },
  build: {
    commonjsOptions: {
      exclude: ["@mapbox/node-pre-gyp", "mock-aws-s3", "aws-sdk", "nock"], // Exclude backend dependencies
    },
  },
})
