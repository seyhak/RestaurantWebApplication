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
            },
            // {
            //     test: /\.css$/, 
            //     use: [
            //         'style-loader',
            //         {loader: 'css-loader', options: {
            //                 modules: true
            //             }
            //         },
            //     ],
            //     // A CSS Module is a CSS file in which all class names and animation names are scoped locally by default."

            // }
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
              },
        ]
    },
    resolve: {
        extensions: [
            '.js' //what extension i want to listen for
        ]
    }
}