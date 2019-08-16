const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = {
  mode: "development",
  entry: "./src/index.js",
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      /* 加载打包图片等静态资源 */
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              limit: 2048
            }
          }
        ]
      },
      /* 配置样式文件 */
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          'less-loader',
          'postcss-loader'
        ]
      },
      /* 配置字体文件 */
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: 'fonts/'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/sacc.ico"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ],
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true,
    overlay: true
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: 'vendor.js'
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,
          filename: 'common.js'
        }
      }
    }
  },
};

module.exports = baseConfig;