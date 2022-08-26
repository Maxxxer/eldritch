const path = require('path');

module.exports = {
    mode: 'development',
    entry: './data/main.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                                         },
                ],
            },
        ],
    },
};