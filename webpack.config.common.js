const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', "./src/index.tsx"],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    devServer: {
        host: '0.0.0.0',
        publicPath: '/public',
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },


    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        modules: ['node_modules/'],
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loaders: [ "babel-loader", "ts-loader"] },

            {
                test: /\.js$/,
                include: ['src',  /node_modules\/@hyperbudget\/hyperbudget-core\/dist/ ],
                loaders: ['babel-loader'],
                exclude: ['node_modules']
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

    plugins: [
      new webpack.DefinePlugin({
        'BACKEND_URL': JSON.stringify(process.env.BACKEND_URL || 'http://localhost:8000'),
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
    ],
};

