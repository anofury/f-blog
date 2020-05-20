const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const articleSrc = { input: './public/articles/', output: '/articles/' }
const { getArticleInfo } = require('./article.analyzer');

module.exports = {
    entry: {
        config: path.resolve(__dirname, './config.js'),
        main: path.resolve(__dirname, './src/main/main.js')
    },
    output: {
        path: path.resolve(__dirname, './page/'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'socket.io-client': 'io',
        'better-scroll': 'BScroll',
        'react-markdown': 'ReactMarkdown',
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
            title: 'Found Blog',
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
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './public'),
                    to: path.resolve(__dirname, './page'),
                    globOptions: {
                        ignore: ['**/ori/**']
                    }
                }
            ]
        }),
        new webpack.DefinePlugin({
            Articles: JSON.stringify(getArticleInfo(articleSrc))
        })
    ],
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.css'],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
};