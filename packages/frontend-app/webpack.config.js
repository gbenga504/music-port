const path = require("path");
const LoadableWebpackPlugin = require("@loadable/webpack-plugin");

module.exports = {
  entry: "./src/app/client.tsx",
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
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new LoadableWebpackPlugin({ filename: "stats.json", writeToDisk: true }),
  ],
};
