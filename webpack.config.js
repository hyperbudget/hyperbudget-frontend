let path = require('path');

module.exports = {
    mode: "development",
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
            { test: /\.tsx?$/, loaders: ["babel-loader", "awesome-typescript-loader"] },

            {
                test: /\.js$/,
                include: ['src', require.resolve('csv-parse'), /node_modules\/@hyperbudget\/hyperbudget-core\/dist/ ],
                use: {
                    loader: 'babel-loader',
                    options: {
                    }
                }
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
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    /*externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },*/
};

