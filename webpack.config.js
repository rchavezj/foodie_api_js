
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    // An area of where our webpack to serve our client
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        // We want to copy each time we
        // are bundling over javascript files,
        // we want to copy our javascript source
        // html into the distribution (dist) folder. 

        // Our source html will be copied into our dist
        // folder, also known as our production ready version.
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};