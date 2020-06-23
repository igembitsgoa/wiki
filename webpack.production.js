const path = require("path");
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: "css/[name].css"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        },
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            },
            {
                test: /\.(svg|gif|ttf|woff2|woff|eot)$/i,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                        context: path.resolve(__dirname, "src/"),
                        outputPath: ".",
                        publicPath: "../",
                        useRelativePaths: true,
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg)$/i,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                        context: path.resolve(__dirname, "src/"),
                        outputPath: ".",
                        publicPath: "../",
                        useRelativePaths: true,
                    }
                }
            }
        ]
    }
});