const path = require("path");
const LoadableWebpackPlugin = require("@loadable/webpack-plugin");
const Dotenv = require("dotenv-webpack");

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
    ],
  },
  plugins: [
    new LoadableWebpackPlugin({ filename: "stats.json", writeToDisk: true }),
    new Dotenv(),
  ],
};
