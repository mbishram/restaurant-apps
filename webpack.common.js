const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { GenerateSW } = require("workbox-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

module.exports = {
	entry: {
		index: path.resolve(__dirname, "./src/scripts/index.ts"),
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js",
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
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "images/",
							esModule: false,
						},
					},
					{
						loader: ImageMinimizerPlugin.loader,
						options: {
							severityError: "warning", // Ignore errors on corrupted images
							minimizerOptions: {
								plugins: [
									["imagemin-mozjpeg", { quality: 75 }],
									["imagemin-gifsicle"],
									["imagemin-pngquant"],
									["imagemin-svgo"],
								],
							},
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
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
	optimization: {
		splitChunks: {
			chunks: "all",
			minSize: 20000,
			maxSize: 70000,
			minChunks: 1,
		},
		minimizer: [new UglifyJsPlugin()],
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
			meta: {
				viewport: "width=device-width, initial-scale=1.0",
				description: "Restaurant listing website for dicoding submission.",
			},
		}),
		// FaviconsWebpackPlugin won't generate the full list of favicon on development.
		// It will generate it on production.
		new FaviconsWebpackPlugin({
			logo: "./src/public/images/logo.png",
			inject: true,
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
			filename: "[name].css",
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
		new BundleAnalyzerPlugin(),
		new CleanWebpackPlugin(),
	],
};
