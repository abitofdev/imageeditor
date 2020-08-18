const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { resolve } = require('path');

const webcomponentsjs = 'node_modules/@webcomponents/webcomponentsjs';

const polyfills = [
    {
        from: 'webcomponents-*.js',
        context: resolve(__dirname, webcomponentsjs),
        to: 'webcomponents',
        flatten: true
    },
    {
        from: 'bundles/*.js',
        context: resolve(__dirname, webcomponentsjs),
        to: 'webcomponents/bundles',
        flatten: true
    },
    {
        from: 'custom-elements-es5-adapter.js',
        context: resolve(__dirname, webcomponentsjs),
        to: 'webcomponents',
        flatten: true
    }
];

const assets = [
    {
        from: '**/*',
        context: 'src/assets',
        to: 'assets',
        noErrorOnMissing: true
    }
];

module.exports = ({ mode }) => {
    return {
        entry: './src/index.ts',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: '[name].[contenthash].js',
            path: resolve(__dirname, 'dist')
        },
        mode,
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new CopyWebpackPlugin({
                patterns: [...polyfills, ...assets]
            })
        ],
        optimization: {
            moduleIds: 'hashed',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            },
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false
                        }
                    }
                })
            ]
        },
        devtool: mode === 'development' ? 'source-map' : 'none'
    };
};
