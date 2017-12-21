// webpack.single.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

process.env.NODE_ENV = 'production';

module.exports = {
    entry: {
        main: __dirname + '/app/main.js',
        // admin: __dirname + '/app/admin.js',
        vendors: ['jquery','bootstrap','react','vue'],
    },
    output: {
        path: path.resolve(__dirname,'build'),
        filename: 'js/[name]-[hash:6].js',
        // publicPath:'static/',
        chunkFilename: 'chunk.[name].js'
    },
    devtool: 'none',
    devServer: {
        contentBase: path.resolve(__dirname,'build'),
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules|bootstrap|mint-ui|mui/,
                // loader: 'style-loader!css-loader?minimize&modules!resolve-url-loader!postcss-loader',
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?minimize&modules!resolve-url-loader!postcss-loader"
                })
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader?sourceMap'
            },
            {
                test: /\.css$/,
                include: /bootstrap|mint-ui|mui/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                include: /glyphicons|mui/,
                // loader: 'null-loader',
                loader: 'url-loader?limit=10240&name=[name]-[hash:8].[ext]&publicPath=./&outputPath=fonts/'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=10240&name=images/[name]-[hash:8].[ext]'
            },
            {
                test: /\.(tpl|ejs)$/,
                loader: 'ejs'
            },
            {
                test: require.resolve("jquery"),
                exclude: /node_modules/,
                loader: "expose?$!expose?jQuery"
            }
        ]
    },
    plugins: [
        // 去除 react、vue 压缩报错
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        }),
        new webpack.BannerPlugin('By CS逍遥剑仙, www.csxiaoyao.com, QQ:1724338257'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'./app/index.tmpl.html')
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                // 变量 '$super', '$', 'exports' or 'require'，不会被混淆
                except: ['$super', '$', 'exports', 'require']
            },
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('css/[name]-[contenthash:6].css', { allChunks: true }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors','manifest'],
            // // 输出的公共资源名称
            // filename: 'common_[name].js',
            // // minChunks: Infinity
            // minChunks: 3
        })
    ]
};