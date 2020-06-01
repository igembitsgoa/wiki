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
                test: /\.(svg|png|jpg|gif|ttf|woff2|woff|eot|)$/i,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                        context: path.resolve(__dirname, "src/"),
                        outputPath: ".",
                        publicPath: ".",
                        useRelativePaths: true,
                    }
                }
            }
        ],
    },
}