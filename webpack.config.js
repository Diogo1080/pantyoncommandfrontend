const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: [/\.less$/,/\.css/],
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: [/\.bmp/, /\.gif/, /\.jpe?g/, /\.png/, /\.svg/],
                loader: "url-loader"
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        proxy: {
            "/api":{
                target:"http://localhost:8080",
                secure: false,
                changeOrigin: true
            }
        },
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hot: true,
        historyApiFallback: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};
