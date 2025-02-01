//  import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5174, 
//     historyApiFallback: true, 
//   },
//   optimizeDeps: {
//     exclude: ["razorpay", "@mapbox/node-pre-gyp", "mock-aws-s3", "aws-sdk", "nock"], 
//   },
//   build: {
//     commonjsOptions: {
//       exclude: ["@mapbox/node-pre-gyp", "mock-aws-s3", "aws-sdk", "nock"], 
//       include: ["razorpay"],
//     },
//   },
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    historyApiFallback: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "razorpay"],  // Ensure React is included
    exclude: [
      "@mapbox/node-pre-gyp", 
      "mock-aws-s3", 
      "aws-sdk", 
      "nock"
    ],
  },
  build: {
    commonjsOptions: {
      exclude: [
        "@mapbox/node-pre-gyp", 
        "mock-aws-s3", 
        "aws-sdk", 
        "nock"
      ],
      include: ["razorpay"],  // You can also keep "razorpay" here if needed
    },
  },
});
