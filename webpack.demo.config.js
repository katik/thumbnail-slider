const path = require("path");
const webpack = require("webpack");
// const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        'demo': './demo/demo.js'
    },
    output: {
        publicPath: '/dist/',
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        loader: 'css-loader',
                        fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                    }),
                    // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                    // the "scss" and "sass" values for the lang attribute to the right configs here.
                    // other preprocessors should work out of the box, no loader config like this nessessary.
                    // 'scss': 'vue-style-loader!css-loader!sass-loader',
                    // 'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                }
            }
        }, { test: /\.(js|jsx)$/, use: 'babel-loader' }, {
            test: /\.css/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: 'css-loader?-url!postcss-loader?'
            })
        }, ]
    },
    devtool: 'cheap-source-map',
    plugins: [new ExtractTextPlugin('demo.css')],
};
