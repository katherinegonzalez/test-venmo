const config = {
    mode: "development",
    entry: __dirname + '/src',
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    }
};

module.exports = config;