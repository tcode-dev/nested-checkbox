const path = require('path');

module.exports = {
    entry: './app/js/check/index.js',
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        filename: 'index.js'
    }
};
