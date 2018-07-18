let common = require('./webpack.config.common.js');
let merge = require('webpack-merge');

module.exports = merge(common, {
    mode: "development",
});
