const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env) => {
    return merge(common, {
        mode: 'development',
        devtool: 'source-map',
        watch: !!env?.watch,
        watchOptions: {
            poll: 5000,
            ignored: /node_modules/,
        },
    });
};
