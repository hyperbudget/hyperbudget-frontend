const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let common = require('./webpack.config.common.js');
let merge = require('webpack-merge');

module.exports = merge(common, {
    mode: "production",
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: true,
        }),
      ]
    },
});
