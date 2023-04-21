const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
	entry: "./src/App.tsx",
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "auto",
		filename: "[name].[contenthash].js",
		clean: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html"),
			inject: true,
			favicon: "src/images/logo.svg"
		}),
		new Dotenv()
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: "ts-loader"
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource"
			}
			// {
			// 	test: /\.(woff|ttf|otf|eot|woff2|svg)$/i,
			// 	loader: "file-loader"
			// }

			// {
			// 	test: /\.svg$/,
			// 	use: [
			// 		{
			// 			loader: "svg-inline-loader",
			// 			options: {
			// 				limit: 1000,
			// 				name: "src/logo/[name].[ext]"
			// 			}
			// 		}
			// 	]
			// }
		]
	},
	resolve: {
		extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	}
};
