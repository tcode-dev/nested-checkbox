const path = require('path');

module.exports = {
    entry: './app/js/top/TopController.js',
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        filename: 'TopController.js'
    }
};
