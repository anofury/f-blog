const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: "development",
    devServer: {
        contentBase: path.resolve(__dirname, './page'),
        host: '192.168.145.108',
        port: '3333',
        inline: true,
        watchOptions: {
            aggregateTimeout: 2000,
            poll: 1000
        },
        // compress: true, // gzip
        historyApiFallback: true,
        hot: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader', 'postcss-loader']
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});