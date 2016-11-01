var path = require('path')
var webpack = require('webpack')
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue',
                options: {
                    loaders: {
                        css: 'vue-style-loader!css-loader',
                        postcss: 'vue-style-loader!css-loader',
                        less: 'vue-style-loader!css-loader!less-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        stylus: 'vue-style-loader!css-loader!stylus-loader',
                        styl: 'vue-style-loader!css-loader!stylus-loader',
                        javascript: 'babel'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue'
        }
    }
    ,
    devServer: {
        historyApiFallback: true,
        noInfo: true
    }
    ,
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
