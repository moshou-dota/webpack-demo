const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

const isProduct = process.env.NODE_ENV === 'production'
function resolve (src) {
  return path.join(__dirname, src)
}

module.exports = {
  entry: {
    index: resolve('src/index'),
    vue: resolve('src/vue')
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader', 'sass-loader']
        // })
        // loader: ['style-loader', 'css-loader', 'sass-loader']
        loader: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: 'vue.html',
      filename: 'vue.html',
      chunks: ['vue']
    }),
    new CleanWebpackPlugin(),
    // new ExtractTextPlugin({
    //   filename: '[name].css'
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new OptimizeCSSPlugin({
      cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
      assetNameRegExp: /\.css$/g,
    })
  ],
  devServer: {
    contentBase: resolve('dist'),
    hot: true
  }
}