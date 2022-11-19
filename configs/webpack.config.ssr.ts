/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-11 01:16:38
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-20 02:28:42
 * @FilePath     : /chat-webpack/configs/webpack.config.ssr.ts
 */
import webpack from 'webpack'
import path from 'path'
import nodeExternals from 'webpack-node-externals'

// process.env.NODE_ENV
const mode = process.env.NODE_ENV
const publicPath = process.env.PUBLIC_PATH || '/'
const isProd = mode === 'production'

export default {
  mode,
  target: 'node',
  entry: {
    'entry-server': path.resolve('src/entry-server.tsx')
  },
  output: {
    path: path.resolve('dist/server'),
    filename: '[name].js',
    publicPath: publicPath,
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
    extensions: [ '.ts', '.tsx', '.js', '.json' ],
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
        // 允许 antd-mobile，否则无法忽略内部 css
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