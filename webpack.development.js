const path = require("path");
const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge(common, {
    devtool: "none",                            // avoid eval statements
    mode: "development",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    }
});