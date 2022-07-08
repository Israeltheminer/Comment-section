const path = require("path");

module.exports = {
  entry: {
    home: "./src/scripts/home.js",
    comment: "./src/scripts/comment.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/scripts")
  },
  target: 'node',
  externals: {
    express: 'express',
  },
  stats: {
    errorDetails: true
  }
};