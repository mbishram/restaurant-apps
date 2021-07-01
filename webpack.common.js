const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { GenerateSW } = require("workbox-webpack-plugin");
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
			template: path.resolve(__dirname, "./src/templates/index.html"),
			filename: "index.html",
			favicon: "src/public/favicon.ico",
			meta: {
				viewport: "width=device-width, initial-scale=1.0",
				description: "Restaurant listing website for dicoding submission.",
			},
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "./src/public/copy"),
					to: path.resolve(__dirname, "./dist/images"),
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: "index.css",
		}),
		new WebpackPwaManifest({
			filename: "manifest.json",
			name: "YELPing you find a restaurant.",
			short_name: "YELPing",
			description: "Restaurant listing website for dicoding submission.",
			display: "standalone",
			theme_color: "#ffffff",
			background_color: "#ffffff",
			icons: [
				{
					src: path.resolve("./src/public/images/logo.png"),
					sizes: [72, 96, 128, 144, 152, 192, 256, 384, 512],
					purpose: "any maskable",
				},
			],
			inject: true,
			publicPath: "./",
		}),
		new GenerateSW({
			swDest: "./sw.js",
			runtimeCaching: [
				{
					urlPattern: /\/$/,
					handler: "StaleWhileRevalidate",
					options: {
						cacheName: "markup",
					},
				},
				{
					urlPattern: /https:\/\/restaurant-api\.dicoding\.dev\/.+/,
					handler: "NetworkFirst",
					options: {
						cacheName: "restaurant-api",
						expiration: {
							maxAgeSeconds: 60 * 60, // An hour
						},
					},
				},
				{
					urlPattern: /.ico$/,
					handler: "CacheFirst",
					options: {
						cacheName: "assets",
						expiration: {
							maxAgeSeconds: 30 * 24 * 60 * 60, // A month
						},
					},
				},
			],
		}),
		new CleanWebpackPlugin(),
	],
};
