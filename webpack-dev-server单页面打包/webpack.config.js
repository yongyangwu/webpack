var CleanWebpackPlugin = require('clean-webpack-plugin');//移除旧的项目文件
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");//提取css
module.exports = {
    entry:'./src/main.js',
    output: {
        path: __dirname +'/dist',
        filename: 'js/bundle.js'
    },
    module:{
      rules:[
          {
              test: /\.scss$/,
              use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: ['css-loader', 'sass-loader']
              })
          },
          {
              test:/\.(png|jpg|gif)$/,
              use:[{
                  loader:'file-loader',
                  options: {
                      name: '[name].[ext]',
                      outputPath: 'images/'
                  }
              }]
          },
      ]
    },
    plugins:[
        new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: 'src/views/home.html'
        }),
        new ExtractTextPlugin({
            filename:'./css/[name].css'
        })
    ]
};