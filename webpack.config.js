const webpack = require('webpack');
const path = require('path');
const compressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        filename: 'room-card.js',
        path: path.resolve(__dirname),
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new compressionPlugin({
            test: /\.js(\?.*)?$/i,
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }
};
