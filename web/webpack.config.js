const path = require('path');

module.exports = {
    entry: './app/js/nestedCheckbox/NestedCheckboxController.js',
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        filename: 'NestedCheckboxController.js'
    }
};
