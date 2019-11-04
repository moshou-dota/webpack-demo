const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const isProduct = process.env.NODE_ENV === 'production'
function resolve (src) {
  return path.join(__dirname, src)
}

module.exports = {
  entry: resolve('src'),
  output: {
    path: resolve('dist'),
    filename: 'boundle.js'
  },
  mode: 'none',
  module: {
    rules: [

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin()
  ]
}