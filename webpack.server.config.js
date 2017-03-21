var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var webpackMd5Hash = require('webpack-md5-hash');
var extractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
	target: 'node',
	devtool: 'cheap-source-map',
	entry: {
		server: './server.js'
	},
	output: {
		filename: 'server.bundle.js',
		path: path.resolve(__dirname),
	},
	resolve: {
		alias: {
			"components": path.resolve(__dirname, 'src/components'),
			"images": path.resolve(__dirname, 'images'),
			"actions": path.resolve(__dirname, 'src/actions')
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'react', 'stage-0']
					}
				}
			},
			{
				test: /\.less$/,
				use: extractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader?modules', 'postcss-loader', 'less-loader'],
					publicPath: '../'
				})
			},
			{
				test: /\.(jpg|png)$/,
				use: 'url-loader?limit=8192&name=server_images/[name][hash:8].[ext]'
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			}
		]
	},
	plugins: [
		new webpackMd5Hash(),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: {
					options: {
						plugins: [autoprefixer({
							browsers: ['last 4 versions']
							// flexbox: false
						})]
					}
				}
			}
		}),
		new extractTextPlugin({
			filename: 'server_css/style[contenthash:6].css',
			disable: false,
			allChunks: true
		})

	]

}