const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules|bootstrap/,
                loader: 'style-loader!css-loader?modules!resolve-url-loader!postcss-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader?sourceMap'
            },
            {
                test: /\.css$/,
                include: /bootstrap|mint-ui/,
                loader: 'style-loader!css-loader'
            },
            {
              // 忽略bootstrap自带的字体文件
              test: /\.(woff|woff2|svg|eot|ttf)$/,
              include: /glyphicons/,
              loader: 'null-loader',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=20480&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.(tpl|ejs)$/,
                loader: 'ejs'
            },
            {
                test: require.resolve("jquery"),
                exclude: /(node_modules|bower_components)/,
                loader: "expose?$!expose?jQuery"
            }
        ]
    },
    plugins: [
        /* 全局shimming */
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"// 创建插件实例，并传入相关参数
        }),
        new webpack.HotModuleReplacementPlugin()// 热加载插件
    ]
};