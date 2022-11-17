/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-10 23:21:33
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 22:35:58
 * @FilePath     : /chat-webpack/configs/webpack.config.csr.ts
 */
import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

const mode = process.env.NODE_ENV
const isProd = process.env.NODE_ENV === 'production'

const entry = [
  path.resolve('src/entry-client.tsx')
]

if (!isProd) entry.push('webpack-hot-middleware/client?timeout=20000')

export default {
  mode,
  entry: {
    'entry-client': entry
  },
  output: {
    path: path.resolve('dist/client'),
    filename: '[name].js',
    publicPath: '/',
    module: true,
    clean: true,
    library: {
      type: 'module'
    }
  },
  devtool: isProd ? 'none' : 'eval-source-map',
  experiments: {
    outputModule: true
  },
  resolve: {
    modules: [ path.resolve('src'), 'node_modules' ],
    extensions: ['.ts', '.js', '.tsx', '.json'],
    alias: {
      '@': path.resolve('src')
    }
  },
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          "thread-loader",
          {
            loader: "babel-loader",
            options: {
              configFile: "./configs/babel.config.js",
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      publicPath: '/',
      template: 'index.html',
      scriptLoading: 'module',
      inject: 'body',
			chunksSortMode: 'auto'
    }),
    new CopyPlugin({
      patterns: [
        { from: "public", to: "public" },
      ],
    })
  ]
}