module.exports = {
    entry: {
        helloWorld: [
            './js/app.js',
        ]  
    },
    output: {
        filename: 'public/app.js'
    },
    module: {
        loaders: [
        {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015','react']
            }
        }
    ]
  },
};
