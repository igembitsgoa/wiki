const path = require("path");
var HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        vendor: "./src/js/vendor.js",
        main: "./src/js/main.js",
        index: "./src/index.js",
        content: "./src/js/content.js"
    },
    devtool: "none",                            // avoid eval statements
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: "./src/index.pug",
            excludeChunks: ['content']
        }),
        new HTMLWebpackPlugin({
            filename: 'Description/index.html',
            template: "./src/contents/Description.pug",
            excludeChunks: ['index']
        })
        // new HTMLWebpackPlugin({
        //     filename: 'Design/index.html',
        //     template: "./src/contents/Design.pug"
        // }),
        // new HTMLWebpackPlugin({
        //     filename: 'Results/index.html',
        //     template: "./src/contents/Results.pug"
        // }),
        // new HTMLWebpackPlugin({
        //     filename: 'Contribution/index.html',
        //     template: "./src/contents/Contribution.pug"
        // }),
        // new HTMLWebpackPlugin({
        //     filename: 'Engineering/index.html',
        //     template: "./src/contents/Engineering.pug"
        // }),
        // new HTMLWebpackPlugin({
        //     filename: 'Experiments/index.html',
        //     template: "./src/contents/Experiments.pug"
        // })
    ],
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
                test: /\.(svg|png|jpg|jpeg|gif|ttf|woff2|woff|eot|)$/i,
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