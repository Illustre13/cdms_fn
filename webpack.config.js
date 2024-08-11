const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // Your existing webpack configuration
  plugins: [
    new Dotenv({
      path: './.env', // Path to your .env file
    }),
  ],
  node: {
    // This ensures that Node.js modules and globals are properly polyfilled or excluded
    process: true,
  },
};
