const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: {
        app: [
            './app/js/top/TopController.js',
          './app/scss/top/index.scss',
        ],
      },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/TopController.js',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/top/index.css',
        }),
    ],
};
