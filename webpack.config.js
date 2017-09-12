/* Webpack Config */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebPackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'bundle.js',
    pathinfo: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Foundation proto',
      template: 'src/index/layout.hbs',
      filename: 'index.html',
      cache: false,
      hash: true
    }),
    new CleanWebPackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.hbs$/,
        use: 'handlebars-loader'
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options:
              {
                plugins: function () {
                  return [autoprefixer]
                }
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    compress: true,
    hot: true
  }
}
