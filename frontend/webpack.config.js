const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
	mode: "development",
	target: "web",
	devtool: "cheap-module-source-map",
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "auto",
		filename: "bundle.js"
	},
	devServer: {
		static: path.join(__dirname, "src/"),
		port: 3000,
		hot: "only",
		compress: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html"
			// favicon: "src/favicon.ico"
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: "ts-loader"
			},
			{
				test: /(\.css)$/,
				use: ["style-loader", "css-loader"]
			}
		]
	},
	resolve: {
		extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
	}
};
