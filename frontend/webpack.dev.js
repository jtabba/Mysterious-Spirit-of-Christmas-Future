const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");

process.env.NODE_ENV = "development";

module.exports = merge(common, {
	mode: "development"
});
