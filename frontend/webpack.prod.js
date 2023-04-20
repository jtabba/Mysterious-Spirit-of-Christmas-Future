const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
	mode: "production",
	devtool: "source-map",
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css"
		})
	],
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin({
				cssProcessorOptions: {
					map: {
						inline: false,
						annotation: true
					}
				}
			}),
			new TerserPlugin({
				// Use multi-process parallel running to improve the build speed
				// Default number of concurrent runs: os.cpus().length - 1
				parallel: true,
				// Enable file caching
				cache: true,
				sourceMap: true
			})
		]
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			}
		]
	}
});
