const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var WebpackAutoInject = require('webpack-auto-inject-version');

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
    plugins: [
      new WebpackAutoInject({
        components: {
            AutoIncreaseVersion: false,
            InjectAsComment: true,
        },
      }),
    ]
});
