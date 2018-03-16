var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./app.js',
    output:{
        path:__dirname + '/dist',
        filename:'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    devServer:{
        proxy: {
            "/api": "http://localhost:8388"
        }
    }
};