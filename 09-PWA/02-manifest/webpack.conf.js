/**
 * @file webpack config
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var config = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};

module.exports = config;
