const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js",
        // publicPath:'static/'
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./build",
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [
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
                loader: 'style-loader!css-loader?minimize&modules!resolve-url-loader!postcss-loader'
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
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin()// 热加载插件
    ]
};