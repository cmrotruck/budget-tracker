const path = require("path");

module.exports = {
  entry: { index: "./public/js/index.js", idb: "./public/js/idb.js" },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/public/dist",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath(url) {
                return url.replace("../", "/public/icons/");
              },
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  mode: "development",
};
