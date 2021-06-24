const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = {
	entry: path.resolve(__dirname, "./src/scripts/index.ts"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [{ loader: "ts-loader" }],
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				exclude: /\.webcomp.s[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
					},
					{
						loader: "sass-loader",
					},
				],
			},
			{
				// To compile a web component style file
				test: /\.webcomp.s[ac]ss$/,
				use: [
					{
						loader: "to-string-loader",
					},
					{
						loader: "css-loader",
					},
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								outputStyle: "compressed",
							},
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "images/",
							esModule: false,
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "fonts/",
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js", ".scss", ".sass", ".css"],
		// To fix webpack doesn't recognize path in tsconfig
		plugins: [new TsconfigPathsPlugin()],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src/templates/index.html"),
			filename: "index.html",
			favicon: "src/public/favicon.ico",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/public/copy"),
					to: path.resolve(__dirname, "dist/images"),
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: "index.css",
		}),
		new CleanWebpackPlugin(),
	],
};
