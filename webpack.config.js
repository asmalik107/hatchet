var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');


const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};


/*
 module.exports = {
 entry: './app/main.js',
 output: {path: __dirname + '/build', filename: 'bundle.js'},
 module: {
 loaders: [
 {
 test: /.jsx?$/,
 loader: 'babel-loader',
 exclude: /node_modules/,
 query: {
 presets: ['es2015', 'react']
 }
 }
 ]
 },
 };*/


const common = {
    entry: PATHS.app + '/main.js',
    output: {path: PATHS.build, filename: 'bundle.js'},
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                // Test expects a RegExp! Note the slashes!
                test: /\.css$/,
                loaders: ['style', 'css'],
                // Include accepts either a path or an array of paths.
                include: PATHS.app
            }
        ]
    }
};


if (TARGET === 'dev-server' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map'
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {});
}
