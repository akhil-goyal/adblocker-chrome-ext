const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        background: path.resolve('src/background/background.ts'),
        contentScript: path.resolve('src/contentScript/contentScript.ts'),
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/i
            },
            {
                type: 'asset/resource',
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/static'),
                    to: path.resolve('dist')
                }
            ]
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve('dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}

// Function that will help in taking all the chunks as an array 
// & using HTML plugin to generate those files in dist folder.
function getHtmlPlugins(chunks) {
    return chunks.map(chunk => new HtmlPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk]
    }))
}