var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var  ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack  =require('webpack');
var isProd = process.env.NODE_ENV === 'production';
console.log(isProd)
module.exports = {
    entry:{
        "test1":"./src/js/test1.js",
        "test2":"./src/js/test2.js"
    },
    output:{
        path:__dirname + '/dist',
        filename: '[name].[hash].js'
    },
    module:{
        rules:[
            // { test: /\.handlebars$/, loader: "handlebars-loader"},
            {
                test: /\.handlebars$/,
                use:['handlebars-loader']
            },
            // { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" }
            {
                test:/\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    resolve:{

    },
    plugins:[
        new CleanWebpackPlugin(['dist']),//首先清楚上一次的dist文件夹以及下面的所有文件
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin({
            filename:'[name].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'test1.html',
            chunks:['test1'],
            template: 'src/views/test1.handlebars'
        }),
        new HtmlWebpackPlugin({
            filename: 'test2.html',
            chunks:['test2'],
            template: 'src/views/test2.handlebars'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        port:8288,
        proxy: {
            "/api": "http://localhost:3000"
        }
    }
};

// proxy: {
//     '/fzjt_aquatic_read': {
//         target: 'http://aquaticread1.xiao-6.com',
//             changeOrigin: true,
//             secure: false
//     },
//     '/fzjt_aquatic_write': {
//         target: 'http://aquaticread1.xiao-6.com',
//             changeOrigin: true,
//             secure: false
//     },'/aquatic_order_service': {
//         target: 'http://aquaticorder1.xiao-6.com',
//             changeOrigin: true,
//             secure: false
//     },'/aquatic_pay_service': {
//         target: 'http://aquaticpay1.xiao-6.com',
//             changeOrigin: true,
//             secure: false
//     },'/file': {
//         target: 'http://fileupload.xiao6.com',
//             changeOrigin: true,
//             secure: false
//     },
//
// }