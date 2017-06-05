const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  entry: './app',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      options: {
        presets: ['react-app']
      },
      exclude: [
          /node_modules/
      ]
    }]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './index.html'
    }])
  ],
  devtool: 'source-map'
}

module.exports = config
