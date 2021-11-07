const path = require('path');
const pkg = require('./package.json')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        library: pkg.name,
        libraryTarget: 'umd'
    }
}