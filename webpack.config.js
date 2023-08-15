const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack")

module.exports = (_env, argv) => {
	const isProduction = argv.mode = "production";

	return {
		entry :  "./src/index.js",
		devtool : 'inline-source-map',
		module : {
			rules : [
				{
					test: /\.(js|jsx)$/i,
					exclude: /node_modules/,
					use: ['babel-loader']
				},
				{
					test: /\.(scss|css)$/i,
					use: ["style-loader", "css-loader", "sass-loader"]
				},
				{
					test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.svg$/],
					type: "asset/resource"
				}
			]
		},
		//pass all js files througn babel
		resolve: {
			extensions: [".*", ".js", ".jsx"]
		},
		plugins : [
			new HtmlWebpackPlugin({
				title : "App Buildr"
			}),
			new webpack.DefinePlugin({
				'process.env.APP_URL': JSON.stringify("http://localhost:3000"),
			}),
		],
		output : {
			filename : '[name].[contenthash].js',
			path : path.resolve(__dirname, "dist"),
			clean : true,
			publicPath: "/"
		},
		devServer: {
			historyApiFallback: true,
			static: {
				directory: path.join(__dirname, "dist"),
			},
			port: 3000
		}
	}
}
