var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
console.log(process.env.NODE_ENV);
var bl = process.env.NODE_ENV;
var isProd;
console.log(bl)
if(bl === "dev"){
    isProd =true;
}else{
    isProd=false;
}
// var isProd = process.env.NODE_ENV == "dev";
console.log(isProd)

module.exports={
    entry:{
        "test1":'./src/js/test1.js',
        "test2":'./src/js/test2.js'
    },
    output: {
        path:__dirname+'/dist',
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test: /\.scss$/,
                //不提取css的时候
                // use: [{
                //     loader: "style-loader" // 将 JS 字符串生成为 style 节点
                // }, {
                //     loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                // }, {
                //     loader: "sass-loader" // 将 Sass 编译成 CSS
                // }]
                //不提取css的时候
                //提取css的代码
                use: ExtractTextPlugin.extract({
                     fallback: "style-loader",
                     use: ['css-loader', 'sass-loader']
                })
                //或者
                // loader: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: 'css-loader!sass-loader'
                // })
                //提取css的代码

            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'[name].[ext]',
                        outputPath:'images/'
                    }
                }]
            },
            //转换es6代码
            {
                test:/\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            //第三方模板loader
            {
                test:/\.handlebars$/,
                loader: 'handlebars-loader'
            }
        ]

    },
    plugins:[
        new CleanWebpackPlugin(['./dist']),
        new ExtractTextPlugin({
            filename:'[name].css'
        }),
        new HtmlWebpackPlugin({
            title: 'test1',
            template: 'src/views/test1.handlebars',
            filename: 'test1.html',
            chunks:['test1']
        }),
        // new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve:{

    },
    devServer: {
        // compress:true

    }

};