var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');//移除旧的项目文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");//提取css

module.exports = {
    entry:'./src/js/app.js',
    output:{
        path:__dirname +'/dist',
        filename:'bundle.js'
    },
    module:{
       rules:[
           {
               test:/\.css$/,
               use: ExtractTextPlugin.extract({
                   fallback: "style-loader",
                   use: ['css-loader']
               })
           },
           {
               test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
               loader: 'url-loader',
               options: {
                   limit: 10000,
                   name: '[name].[ext]'
               }
           }
       ]
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new ExtractTextPlugin({
            filename:'[name].css'
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    devServer: {
      // contentBase:'./src'
    }
};