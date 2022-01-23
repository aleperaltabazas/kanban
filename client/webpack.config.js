const path = require("path");
const Plugins = require("./webpack.plugins");
const Utils = require("./webpack.utils");

const isProduction = process.env.NODE_ENV === "production";
const devtool = isProduction ? "hidden-source-map" : "source-map";
const version = Utils.getPomVersion();

const entryPoints = {
    "main": ["./src/main.tsx"]
};

const optimization = {
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                chunks: "initial",
                enforce: true
            }
        }
    }
};

module.exports = {
    mode: isProduction ? "production" : "development",
    optimization,
    entry: {
        vendor: ["react", "react-dom"],
        ...entryPoints
    },
    output: {
        path: path.resolve(__dirname, `../kanban-backend/src/main/resources/static/kanban/versions/${version}/build`),
        filename: "[name].js",
        chunkFilename: "[name].chunk.bundle.js",
        publicPath: `/kanban/versions/${version}/build/`
    },
    devtool: devtool,
    resolve: {
        alias: {
            models: path.resolve(__dirname, "src/models"),
            services: path.resolve(__dirname, "src/services"),
        },
        extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
    },
    plugins: [
        ...Plugins.base,
    ].concat(isProduction ? Plugins.production : Plugins.development),
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: true,
                            sourceMap: true,
                            modules: {
                                exportLocalsConvention: "camelCase",
                                mode: "local",
                                localIdentName: "[name]__[local]___[hash:base64:5]"
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: ["node_modules"]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader"
            },
            {
                test: /\.(svg|png|jpg|gif|ttf|woff(2)?)$/i,
                use: [
                    {
                        loader: "url-loader",
                    }
                ]
            }
        ]
    }
};