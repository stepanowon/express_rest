var webpack = require('webpack')
var path = require('path');

module.exports = {
    entry: './server.js',
    target: 'node',
    output: {
        path: path.join(__dirname,'build'),
        filename: 'backend.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            }
        })
    ]
};