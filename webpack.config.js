const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const path = require("path");
const UnzipsfxPlugin = require("unzipsfx-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  target: "node",
  node: false,
  externals: {
    "electron": "electron",
    "original-fs": "original-fs"
  },
  output: {
    path: path.join(__dirname, "build", "system-metrics"),
    filename: "index.js"
  },
  plugins: [
    new CleanWebpackPlugin(["build"]),
    new webpack.IgnorePlugin(/vertx/),
    new CopyWebpackPlugin([{from: "package.json"}]),
    new MinifyPlugin(),
    new ZipPlugin({
      path: path.join(__dirname, "build"),
      filename: "system-metrics"
    }),
    new UnzipsfxPlugin({
      outputPath: path.join(__dirname, "build"),
      outputFilename: "system-metrics"
    })
  ],
  stats: {
    warningsFilter: [
      /bq-controller[\s\S]*dependency is an expression.*/,
      "Module not found: Error: Can't resolve 'osx-temperature-sensor'"
    ]
  }
};
