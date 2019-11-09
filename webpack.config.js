let path = require("path");
let webpack = require("webpack");

module.exports = {
  entry: {
    game: "./src/pages/game/game.js",
    score: "./src/pages/score/score.js"
  },

  output: {
    path: path.join(__dirname, "src"),
    filename: "dist/[name].bundle.js"
  },

  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: path.join(__dirname, "src"),
        query: {
          presets: "es2015"
        }
      }
    ]
  },
  plugins: [new webpack.NoErrorsPlugin()],
  stats: {
    colors: true
  },
  devtool: "source-map"
};
