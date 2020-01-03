const path = require('path');

module.exports = {
    entry: {
        app: './order_manager/scripts/main.js' //entry script
    },
    watch: true, //will be recompiled after every change
    devtool: 'source-map', //way to debug modern webapps (we can see )
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/, //any js file we encounter
                exclude: /node_modules/, //except node modules
                use: [
                    {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/react']
                      }
                    }
                ],
            }
        ]
    },
    resolve: {
        extensions: [
            '.js' //what extension i want to listen for
        ]
    }
}