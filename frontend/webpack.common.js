const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
	entry: "./src/App.tsx",
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "auto",
		filename: "[name].bundle.js",
		clean: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Production",
			template: "src/index.html",
			favicon: "src/logo/logo-color.svg"
		}),
		new Dotenv()
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
