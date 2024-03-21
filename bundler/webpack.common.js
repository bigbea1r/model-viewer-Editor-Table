const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
// const { WebpackGLTFLoaderPlugin } = require('gltf-webpack-loader');

module.exports = {
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@google/model-viewer': path.resolve(__dirname, '../node_modules/@google/model-viewer/dist/model-viewer.js'),
            'three': path.resolve(__dirname, '../node_modules/three/build/three.module.js'),
            // 'gltfLoader': path.resolve(__dirname, '../node_modules/three/examples/js/loaders/GLTFLoader.js') // Алиас для локального GLTFLoader
        }
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true,
            scriptLoading: 'defer'
        }),
        new MiniCSSExtractPlugin(),
        // new WebpackGLTFLoaderPlugin() // Добавление плагина gltf-loader
    ],
    module: {
        rules: [
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },

            // GLTF
            // {
            //     test: /\.(gltf)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 outputPath: 'assets/models/'
            //             }
            //         }
            //     ]
            // },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            }
        ]
    },
    experiments: {
        topLevelAwait: true,
    }
};
