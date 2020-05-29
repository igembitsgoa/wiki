const path = require("path");
var HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: "./src/index.js",
        vendor: "./src/js/vendor.js"
    },
    devtool: "none",                            // avoid eval statements
    plugins: [new HTMLWebpackPlugin({
        template: "./src/index.pug"
    })],
    module: {
        rules: [
            {
                test: /\.pug$/i,
                use: ['pug-loader']
            },
            {
                test: /\.html$/i,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|gif)$/i,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "img"
                    }
                }
            }
        ],
    },
}