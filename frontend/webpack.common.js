const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");
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
			favicon: "src/logo/logo-color.svg"
		}),
		new HtmlWebpackInlineSVGPlugin({
			runPreEmit: true
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
				test: /\.svg$/,
				use: "file-loader"
			}
		]
	},
	resolve: {
		extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
	}
};
