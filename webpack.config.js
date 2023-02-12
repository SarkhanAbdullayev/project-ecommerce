const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");


module.exports = {
    context: __dirname,
    entry: "./src/main.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.jsx",
        publicPath: "/",
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_module/,
                use: "babel-loader",
            },
            {
                test: /\.css?$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: "file-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "./index.html"),
            filename: "index.html",
        }),
    ],
};
