const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// read bckground img dir and return img list
const { GetBackroundImgConfig } = require('./node.func');
const BackroundImgDir = { PACK: './public/img/bg/', PAGE: './img/bg/' };

module.exports = {
    entry: {
        config: path.resolve(__dirname, './config.js'),
        main: path.resolve(__dirname, './src/main/main.js')
    },
    output: {
        path: path.resolve(__dirname, './page/'),
        filename: 'js/[name].js'
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'socket.io-client': 'io',
        'better-scroll': 'BScroll',
        'setting': 'setting',
        'workerTimer': 'workerTimer'
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[name].[ext]',
                        outputPath: 'img/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            title: '小方の博客',
            hash: true,
            inject: true,
            minify: {
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                collapseBooleanAttributes: true,
                minifyCSS: true,
                minifyJS: true
            },
            chunks: 'all',
            version: new Date().getTime()
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './public'),
                to: path.resolve(__dirname, './page'),
                ignore: '*/ori/*'
            }
        ]),
        // new webpack.DefinePlugin({
        //     BGIMGS: JSON.stringify(GetBackroundImgConfig(BackroundImgDir))
        // })
    ],
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.css'],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
};