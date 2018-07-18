let path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: "production",
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: true,
        }),
      ]
    },
    entry: ['babel-polyfill', "./src/index.tsx"],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        modules: ['node_modules/'],
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loaders: [ "babel-loader", "awesome-typescript-loader"] },

            {
                test: /\.js$/,
                include: ['src', require.resolve('csv-parse'), /node_modules\/@hyperbudget\/hyperbudget-core\/dist/ ],
                loaders: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [ 'style-loader','css-loader' ],
                include: [
                    /src/,
                ],
            },

            {
                test: /\.css$/,
                use: ['style-loader','css-loader'],
                include: [
                    /node_modules/,
                ],

            },
            {
              test: /\.svg$/,
              loader: 'file-loader'
            },
        ]
    },
};

