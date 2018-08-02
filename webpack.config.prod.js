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
        InjectByTag: {
          fileRegex: /\.+/,
          // regexp to find [AIV] tag inside html, if you tag contains unallowed characters you can adjust the regex
          // but also you can change [AIV] tag to anything you want
          AIVTagRegexp: /(\[AIV])(([a-zA-Z{} ,:;!()_@\-"'\\\/])+)(\[\/AIV])/g,
          dateFormat: 'h:MM:ss TT'
        }
      }),
    ]
});
