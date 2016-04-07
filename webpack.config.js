module.exports = {
    entry: {
        helloWorld: [
            'webpack-dev-server/client?http://localhost:8080',
             './js/helloworld.js',
             'webpack/hot/only-dev-server',
        ]  
    },
    output: {
        filename: 'public/[name].js'
    }
};