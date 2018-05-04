const path = require('path');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './app/assets/scripts/App.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, "./app/temp/scripts"),
    filename: "[name].js"
  },
  module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
           presets: ['env', 'stage-0']
        }
    }]
  }
}