const path = require("path");

module.exports = {
    cache: false,
    mode: "development",
    entry: ["./src/app.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "bundle.js",
    },
    devServer: {
        open: true,
        static: {
            directory: path.join(__dirname, "/"),
        },
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
        ],
    },
};
