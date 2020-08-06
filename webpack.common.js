const path = require("path");
const fs = require("fs");
var HTMLWebpackPlugin = require("html-webpack-plugin");

// List all files in a directory in Node.js recursively in a synchronous fashion
// https://gist.github.com/kethinov/6658166#gistcomment-1976458
const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach((file) => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
};

const dir = "src/pages"
const pages = walkSync(dir).map((el) => el.slice(dir.length + 1));

console.log(pages)

module.exports = {
  entry: {
    index: "./src/index.js",
    content: "./src/js/content.js",
  },
  devtool: "none", // avoid eval statements
  // https://stackoverflow.com/questions/44557802/how-to-create-multiple-pages-in-webpack
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "./src/index.pug",
      excludeChunks: ["content"],
    }),
    ...pages.map(
      (page) =>
        new HTMLWebpackPlugin({
          template: "./src/pages/" + page,
          filename: page.slice(0, -4) + "/index.html",
          excludeChunks: ["index"],
        })
    ),
    // new HTMLWebpackPlugin({
    //     filename: 'Description/index.html',
    //     template: "./src/pages/Description.pug",
    //     excludeChunks: ['index']
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["html-loader", "pug-html-loader"],
      },
    ],
  },
};
