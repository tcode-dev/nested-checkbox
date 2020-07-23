const Autoprefixer = require('autoprefixer');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: {
        '/js/TopController': './sample/frontend/js/top/TopController.js',
        '/css/top/index': './sample/frontend/scss/top/index.scss',
    },
    output: {
        path: path.resolve(__dirname, 'sample/public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: 3,
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                Autoprefixer({
                                    grid: true,
                                }),
                            ],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new FixStyleOnlyEntriesPlugin(), new ManifestPlugin()],
};
