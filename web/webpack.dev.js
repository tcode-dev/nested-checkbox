const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    return merge(common, {
        mode: 'development',
        output: {
            filename: '[name].js',
        },
        devtool: 'source-map',
        watch: !!env?.watch,
        watchOptions: {
            poll: 5000,
            ignored: /node_modules/,
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
        ],
    });
};
