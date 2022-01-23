const webpack = require("webpack");

module.exports =  class Mocks {
    constructor() {
        this.args = process.argv.filter(data => data.includes("--MOCK")).map(data => data.replace("--",""));
    }

    mocksApply() {
        const M = {};
        this.args.map(data => M[data] = true);

        return new webpack.DefinePlugin({GLOBAL_MOCKS: M});
    }
};