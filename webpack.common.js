const path = require("path");
const fs = require('fs');
var HTMLWebpackPlugin = require('html-webpack-plugin');

const pages =
    fs
        .readdirSync(path.resolve(__dirname, 'src/pages'))
        .filter(fileName => fileName.endsWith('.pug'));

console.log(pages);

module.exports = {
    entry: {
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
        ...pages.map(page => new HTMLWebpackPlugin({
            template: "./src/pages/" + page,
            filename: page.slice(0, -4) + "/index.html",
            excludeChunks: ['index']
        }))
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
                use: ['html-loader', 'pug-html-loader']
            }
        ],
    },
}