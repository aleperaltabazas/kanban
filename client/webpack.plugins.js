const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const Utils = require("./webpack.utils");
const WebpackModules = require('webpack-modules');

const version = Utils.getPomVersion();

const base = [
    new webpack.DefinePlugin({
        VERSION: JSON.stringify(version)
    }),
    new CopyWebpackPlugin({
        patterns: [
        {from: "stylesheets", to: "stylesheets"},
    ]}),
    new CleanWebpackPlugin(
        {cleanStaleWebpackAssets: false} //Skip cleaning files copied by CopyWebpackPlugin
    ),
    new WebpackModules()
];

const development = [
    new BundleAnalyzerPlugin({
        analyzerHost: "127.0.0.1",
        analyzerPort: 3333,
        openAnalyzer: false
    }),
    new webpack.HotModuleReplacementPlugin()
];

const production = [
    new OptimizeCssAssetsPlugin({}),
    new UglifyJSPlugin({
        sourceMap: true
    })
];

module.exports = {
    base,
    development,
    production
};