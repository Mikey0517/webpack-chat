/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-11 01:16:38
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-14 22:51:17
 * @FilePath     : /chat-webpack/configs/webpack.config.ssr.ts
 */
import webpack from 'webpack'
import path from 'path'
import nodeExternals from 'webpack-node-externals'

const mode = process.env.NODE_ENV
const isProd = process.env.NODE_ENV === 'production'

export default {
  mode,
  target: 'node',
  entry: {
    'entry-server': path.resolve('src/entry-server.tsx')
  },
  output: {
    path: path.resolve('dist/server'),
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[id].js',
    chunkFormat: !isProd ? 'commonjs' : 'module',
    clean: true,
    library: {
      name: !isProd ? 'ssr' : undefined,
      type: !isProd ? 'umd' : 'module'
    }
  },
  experiments: {
    outputModule: isProd
  },
  resolve: {
    modules: [ path.resolve('src'), 'node_modules' ],
    extensions: [ '.ts', '.js', '.tsx', '.json' ],
    alias: {
      '@': path.resolve('src')
    }
  },
  externals: [
		nodeExternals({
      // @ts-ignore
      importType: !isProd ? 'commonjs' : 'node-commonjs',
			allowlist: [
				/\.(?!(?:tsx?|jsx?|json)$).{1,5}$/i,
        /^antd-mobile/
			],
		}),
	],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: "./configs/babel.config.js",
          }
        }
      },
      {
        test: /\.css|.less$/i,
        use: [
          'ignore-loader',
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
			'NODE_ENV': JSON.stringify(mode),
		}),
  ]
}