/**@type {import("webpack").Configuration} */

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    example: "./example.js",
  },
  optimization: {
    concatenateModules: true, // 开启 scope hositing
  },
};
