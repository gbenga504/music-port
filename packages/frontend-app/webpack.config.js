const path = require("path");
const LoadableWebpackPlugin = require("@loadable/webpack-plugin");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: { client: "./src/app/client.tsx" },
  mode: "development",
  output: {
    publicPath: "/public/",
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist/public"),
  },
  resolve: {
    extensions: [".ts", ".tsx", "..."],
  },
  devtool:
    process.env.NODE_ENV === "production" ? "source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  plugins: [
    new LoadableWebpackPlugin({ filename: "stats.json", writeToDisk: true }),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].bundle.css",
      chunkFilename: "[name].[contenthash].bundle.css",
      // Ignore the order of css imports until we can reorganize the imports
      ignoreOrder: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: `${__dirname}/src/assets`, to: `${__dirname}/dist/public` },
      ],
    }),
  ],
};
