var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public/javascripts/dist');
var APP_DIR = path.resolve(__dirname, 'client/js');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: APP_DIR,
                loader: 'babel',
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract("css")
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    }
};

module.exports = config;
