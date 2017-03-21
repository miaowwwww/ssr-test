var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var webpackMd5Hash = require('webpack-md5-hash');
var extractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');
var cleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
	devtool: 'cheap-source-map',
	entry: {
		// vendor: './src/vendor.js',		
		vendor: ['react', 'react-dom', 'redux', 'react-redux', 'lib-flexible', 'react-router'],
		app: './src/index.js'
	},
	output: {
		filename: 'js/[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		chunkFilename: 'js/[name]-[chunkhash:8].js'
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
				use: ['url-loader?limit=8192&name=images/[name][hash:6].[ext]']
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html',
			title: 'HappyHour-m',
			template: path.resolve(__dirname, 'src/index.html')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
			// names: ['app', 'vendor']
		}),
		new cleanWebpackPlugin(['dist'], {
			root: '',
			verbose: true,
			dry: false,
			exclude: []
		}),
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
			filename: 'css/style.css',
			disable: false,
			allChunks: true
		})

	]

}